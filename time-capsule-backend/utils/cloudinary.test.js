const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: "../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadTest = async () => {
  try {
    const result = await cloudinary.uploader.upload(
      path.join(__dirname, "test-image.jpg"),
    );
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

uploadTest();
