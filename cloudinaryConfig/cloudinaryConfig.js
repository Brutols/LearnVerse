const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "LearnVerse",
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
      public_id: file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9]/g, "_"),
    };
  },
});

const cloudUpload = multer({ storage: cloudStorage });

exports.uploadFile = (req, res, next) => {
  cloudUpload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Multer error ${err.message}` });
    } else if (err) {
      return res.status(500).json({ error: `Cloudinary Error ${err.message}` });
    }
    next();
  });
};
