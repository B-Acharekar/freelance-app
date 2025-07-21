import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "sbworks-uploads",
      format: file.mimetype.split("/")[1], // ensures Cloudinary uses correct extension
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    };
  },
});

export const upload = multer({ storage });
