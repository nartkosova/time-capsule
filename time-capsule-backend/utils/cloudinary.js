const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config({ path: "../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "capsules",
    allowed_formats: [
      "jpg", "png", "jpeg", "gif",
      "mp4", "mp3", "avi", "mov",
      "wav", "ogg", "flac",
    ],
    transformation: [
      { quality: "auto", fetch_format: "auto", width: 800, crop: "limit" },
    ],
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
