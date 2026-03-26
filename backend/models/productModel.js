import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, "Title must cotain at least 3 characters."],
      maxLength: [32, "Title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: true,
      minLength: [8, "Description must cotain at least 10 characters."],
      maxLength: [500, "Description cannot exceed 500 characters."],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative."],
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative."],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
   
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
