import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: "sbworks-uploads",
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
      resource_type: "auto",
      access_mode: "public",
      format: isImage ? file.mimetype.split("/")[1] : undefined, // only apply format for images
      ...(isImage && {
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
      }),
    };
  },
});

export const upload = multer({ storage });
