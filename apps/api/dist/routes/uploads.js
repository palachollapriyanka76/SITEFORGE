import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// POST /api/uploads/image — Upload image to Cloudinary
router.post("/image", requireAuth(), upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: { code: "NO_FILE", message: "No file uploaded" } });
        }
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: "siteforge",
                resource_type: "image",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            uploadStream.end(req.file.buffer);
        });
        return res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
                width: result.width,
                height: result.height,
            },
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ success: false, error: { code: "UPLOAD_ERROR", message: "Failed to upload image" } });
    }
});
export default router;
//# sourceMappingURL=uploads.js.map