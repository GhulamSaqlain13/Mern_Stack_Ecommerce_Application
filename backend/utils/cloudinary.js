import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new Error("Local file path is required!");
  }

  try {
    console.log("Uploading:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ecommerce/products",
    });

    //  SAFE DELETE AFTER SUCCESS
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Deleted after success:", localFilePath);
    }

    return {
      public_id: response.public_id,
      secure_url: response.secure_url,
    };
  } catch (error) {
    // SAFE DELETE EVEN IF ERROR
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Deleted after error:", localFilePath);
    }

    console.error("Cloudinary Error:", error.message);
    throw new Error("Cloudinary upload failed!");
  }
};

export default uploadToCloudinary;
