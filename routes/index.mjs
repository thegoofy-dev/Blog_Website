import { Router } from "express";
import userRouter from "./user.mjs";
import blogRouter from "./blog.mjs";
import blogManageRouter from "./blog_manage.mjs"
import { checkForAuthenticationCookie } from "../middlewares/authentication.mjs";
import cookieParser from "cookie-parser";
import { Blog } from "../models/blog.mjs";
import methodOverride from "method-override";

const router = Router();

router.use(cookieParser());
router.use(checkForAuthenticationCookie('token'));
router.use(methodOverride("_method")); // Use method-override middleware

// Route to render the home page
router.get("/home", async (req, res) => {
  const allblogs = await Blog.find({}).sort({ title: 1 });
  res.render("home", {
    user: req.user,
    blog: allblogs,
  });
});

// Use userRouter after the authentication middleware
router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use(blogManageRouter);

export default router;
