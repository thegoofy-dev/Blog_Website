import { Router } from "express";
import multer from "multer";
import path from "path";
import { addCommentToBlogHandler, createBlogPostHandler, getBlogByIdHandler, renderAddBlogFormHandler } from "../controllers/blog.mjs";

const router = Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
// Add New Blog Get Route
router.get("/add-new", renderAddBlogFormHandler);

// Blog Get Route
router.get("/:id", getBlogByIdHandler);

// Blog Post Route
router.post("/", upload.single("coverImage"), createBlogPostHandler);

// Comment Post Route
router.post("/comment/:blogId", addCommentToBlogHandler);

export default router;
