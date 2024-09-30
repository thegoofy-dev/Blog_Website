import { Router } from "express";
import {
  handleForDeleteBlog,
  handlerForUpdateBlog,
  handleForRenderEditBlogPage,
  handleForRenderAllBlogs,
} from "../controllers/blog_manage.mjs";

const router = Router();
// Rendering My-blogs Page
router.get("/my-blogs", handleForRenderAllBlogs);

// Blog Edit Route
router.get("/edit-blog/:id", handleForRenderEditBlogPage);

// Blog Update Route
router.put("/update-blog/:id", handlerForUpdateBlog);

// Blog Delete Route
router.post("/delete-blog/:id", handleForDeleteBlog);

export default router;
