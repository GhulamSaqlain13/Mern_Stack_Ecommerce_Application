import Product from "../models/productModel.js";
import cloudinary from "cloudinary";
import uploadToCloudinary from "../utils/cloudinary.js";
// import Review from "../models/ReviewModel.js";

//  Create Product Controller with Multiple Image Upload to Cloudinary
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    if (!title || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please provide title, description, price, category and stock!",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload product images" });
    }
    let images = [];

    // Loop through multiple images and upload each to Cloudinary
    for (let file of req.files) {
      const uploadedImage = await uploadToCloudinary(file.path);
      console.log(uploadedImage);

      images.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      });
    }
    console.log(images);

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      images,
    });
    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

//Delete Product Controller
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    // Delete images from Cloudinary
    for (let image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

//update product controller
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, stock } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    // Update fields if provided
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (let image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
      let images = [];
      // Upload new images to Cloudinary
      for (let file of req.files) {
        const uploadedImage = await uploadToCloudinary(file.path);
        images.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }
      product.images = images;
    }

    await product.save();
    res.status(200).json({
      success: true,
      product,
      message: "Product Updated  Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

// Get Single Product Controller
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    // .populate("reviews.user", "name email"); // Assuming you have a reviews array with user references
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
//get  All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
      message: "products get",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Products This Month
export const getCurrentMonthProducts = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const products = await Product.find({
      createdAt: {
        $gt: startOfMonth,
        $lt: endOfMonth,
      },
    });

    res.status(200).json({
      success: true,
      products,
      message: "products get",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//filter Products
export const filterProducts = async (req, res) => {
  try {
    let {
      category,
      minPrice,
      maxPrice,
      inStock,
      search,
      sort,
      order,
      page,
      limit,
    } = req.query;

    //  Build Filter
    let filter = {};

    // Multiple category filter
    if (category) {
      const categoriesArray = category.split(","); // convert "Electronics,Clothes" => ["Electronics", "Clothes"]
      filter.category = { $in: categoriesArray };
    }

    if (inStock === "true") {
      filter.stock = { $gt: 0 };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.title = {
        $regex: new RegExp(search, "i"),
      };
    }

    //  Sorting
    let sortOption = {};
    if (sort) {
      sortOption[sort] = order === "desc" ? -1 : 1; // asc = 1, desc = -1
    }

    //  Pagination
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(filter); // total filtered products

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.json({
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUniqueCategories = async (req, res) => {
  try {
    // .distinct() function saari unique values nikal leta hai
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//review
// export const createReview = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { productId, rating, comment } = req.body;

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     //  Check if user already reviewed this product
//     const alreadyReviewed = await Review.findOne({
//       user: userId,
//       product: productId,
//     });

//     if (alreadyReviewed) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already reviewed this product",
//       });
//     }

//     //  Create review
//     const review = await Review.create({
//       user: userId,
//       product: productId,
//       rating,
//       comment,
//     });

//     //  Recalculate product rating
//     const reviews = await Review.find({ product: productId });

//     const avgRating =
//       reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

//     //  Update product
//     await Product.findByIdAndUpdate(productId, {
//       ratings: avgRating,
//       numOfReviews: reviews.length,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Review added successfully",
//       review,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
