import { v2 as cloudinary } from "cloudinary";

export function getCloudinary() {
  const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

  if (!CLOUDINARY_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) {
    throw new Error("❌ Missing Cloudinary environment variables");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });

  return cloudinary;
}

export default cloudinary;