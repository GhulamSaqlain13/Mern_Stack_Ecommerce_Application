import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId, quantity } = req.body;
    console.log("User:", req.user);

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!productId || !quantity)
      return res
        .status(400)
        .json({ message: "productId and quantity required" });

    //  Product database se lao
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });
    //  Stock check karo
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Only ${product.stock} items in stock`,
      });
    }

    //  Database wali price 
    const price = product.price;

    //  Cart find karo
    let cart = await Cart.findOne({ userId });
    console.log("Cart:", cart);

    if (!cart) {
      cart = new Cart({ userId, cartItems: [] });
    }

    //  Check existing item
    const existingItem = cart.cartItems.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = price;
    } else {
      cart.cartItems.push({ productId, quantity, price });
    }

    //  Total calculate
    cart.totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    await cart.save();

    cart = await cart.populate("cartItems.productId", "title price images");
    
    res.status(200).json({
      success: true,
      message: "Product added!",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.cartItems.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (quantity <= 0) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.productId.toString() !== productId,
      );
    } else {
      item.quantity = quantity;
    }
    cart.totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    await cart.save();
    let updatedCart = await cart.populate(
      "cartItems.productId",
      "title price images stock",
    );
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      updatedCart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }
    //  Item remove
    cart.cartItems = cart.cartItems.filter(
      (item) => item.productId.toString() !== productId,
    );
    //  Total recalculate
    cart.totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    await cart.save();
    cart = await cart.populate(
      "cartItems.productId",
      "title price images stock",
    );
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }
    cart.cartItems = [];
    cart.totalPrice = 0;
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    console.log("USER ID:", userId);

    let cart = await Cart.findOne({ userId });

    console.log("CART BEFORE POPULATE:", cart);

    if (!cart) {
      cart = await Cart.create({
        userId,
        cartItems: [],
        totalPrice: 0,
      });
    }

    cart = await cart.populate(
      "cartItems.productId",
      "title price images stock",
    );

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log("GET CART ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
