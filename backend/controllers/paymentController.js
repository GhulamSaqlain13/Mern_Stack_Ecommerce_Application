import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import stripe from "../utils/stripe.js";
import Product from "../models/productModel.js";

export const createCheckoutSession = async (req, res) => {
  try {
  
    const userId = req.user?._id;
    const cart = await Cart.findOne({ userId }).populate({
      path: "cartItems.productId",
      select: "title price",
    });

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // console.log(cart.cartItems[0].productId.title);
    // console.log(JSON.stringify(cart, null, 2));

    const lineItems = cart.cartItems.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.productId.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    // console.log(lineItems);
    const customer = await stripe.customers.create({
      email: req.user.email,
      name: req.user.name,

      metadata: {
        userId: req.user._id.toString(),
        cartItems: cart.cartItems.toString(),
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer: customer.id, // session customer set
      //  Stripe khud address collect kare
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "PK"],
      },
      phone_number_collection: { enabled: true },
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: { userId: req.user._id.toString() },
    });
    console.log(session);
    console.log(session.url);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleStripeWebhook = async (req, res) => {
  console.log("Webhook reached backend");

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("Checkout session completed:", session.id);

    //  Prevent duplicate orders
    const existingOrder = await Order.findOne({
      stripeSessionId: session.id,
    });

    if (existingOrder) {
      console.log("Order already exists for this session");
      return res.status(200).json({ received: true });
    }

    const userId = session.metadata.userId;

    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");
    if (!cart) return res.status(200).json({ received: true });

    //  Stripe customer details
    const customerDetails = session.customer_details || {};
    const address = customerDetails.address || {};

    const order = new Order({
      userId,
      orderItems: cart.cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      })),

      shippingAddress: {
        fullName: customerDetails.name || "Unknown",
        email: customerDetails.email || "Unknown",
        phone: customerDetails.phone || "0000000000",
        address: address.line1 || "Unknown",
        city: address.city || "Unknown",
        postalCode: address.postal_code || "00000",
        country: address.country || "Unknown",
      },

      totalPrice: session.amount_total / 100,
      paymentStatus: "paid",
      stripeSessionId: session.id,
    });

    await order.save();

    //  Reduce stock
    for (const item of cart.cartItems) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    //  Clear cart
    cart.cartItems = [];
    cart.totalPrice = 0;
    await cart.save();

    console.log("Order created successfully:", order._id);
  }

  res.status(200).json({ received: true });
};
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("orderItems.productId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
