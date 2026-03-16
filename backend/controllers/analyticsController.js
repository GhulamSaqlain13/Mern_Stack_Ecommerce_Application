// import User from "../models/userModel.js";
// import Product from "../models/productModel.js";
// import Order from "../models/orderModel.js";

// // Recent Orders

// // Total Users
// export const totalUsers = async (req, res) => {
//   try {
//     const usersCount = await User.countDocuments();

//     res.status(200).json({
//       success: true,
//       usersCount,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error while getting all user count",
//     });
//   }
// };

// // Total Products
// export const totalProducts = async (req, res) => {
//   try {
//     const productsCount = await Product.countDocuments();

//     res.status(200).json({
//       success: true,
//       productsCount,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error while getting all products count",
//     });
//   }
// };

// // Total Orders
// export const totalOrders = async (req, res) => {
//   try {
//     const ordersCount = await Order.countDocuments();

//     res.status(200).json({
//       success: true,
//       ordersCount,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error while getting all orders count",
//     });
//   }
// };

// // Total Revenue
// export const totalRevenue = async (req, res) => {
//   const revenueTotal = await Order.aggregate([
//     //stage1  Filter paid orders
//     {
//       $match: { paymentStatus: "paid" },
//     },
//     //stage2  Sum totalPrice
//     {
//       _id: null,
//       revenue:{$sum:"$totalPrice"},
//     },
//   ]);
//   const revenue = revenueTotal[0]?.revenue || 0;

// };

// // Monthly Sales Chart
// export const monthlySales= async (req, res) => {

// }
// // Only paid orders

// // Extract month from createdAt

// // Sum prices

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // COUNTS
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // TOTAL REVENUE
    const revenueData = await Order.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.revenue || 0;

    // MONTHLY SALES
    const monthlySales = await Order.aggregate([
      {
        $match: { paymentStatus: "paid" },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
    //TOP SELLING PRODUCTS
    // (Field, Maqsad);
    // "_id: ""$field""",Data ko us specific field ke hisaab se tukron mein baant deta hai.
    // _id: null,Poore data ko aik hi jagah jama kar deta hai (Grand Total nikalne ke liye).
    const topProducts = await Order.aggregate([
      { $unwind: "$orderItems" },

      {
        $group: {
          _id: "$orderItems.productId",
          totalSold: { $sum: "$orderItems.quantity" },
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $project: {
          name: "$product.name",
          totalSold: 1,
        },
      },

      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);
    //Payment Stats
    const paymentStats = await Order.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);
    //order by status
    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    // RECENT ORDERS
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email")
      .populate("orderItems.productId", "name price");

    // response
    res.status(200).json({
      success: true,
      message: "Dashboard data found",
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      monthlySales,
      recentOrders,
      orderStatusStats,
      topProducts,
      paymentStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Dashboard data error",
    });
  }
};
