import { Router } from "express";
import userRouter from "./user.mjs";
import blogRouter from "./blog.mjs";
import { checkForAuthenticationCookie } from "../middlewares/authentication.mjs";
import cookieParser from "cookie-parser";
import { Blog } from "../models/blog.mjs";


const router = Router();

router.use(cookieParser());
router.use(checkForAuthenticationCookie('token'));

// Route to render the home page
router.get("/home", async(req, res) => {
  const allblogs = await Blog.find({}).sort({ title: 1 });  
  res.render("home", {
      user: req.user,
      blog: allblogs,
    });
  });

// Use userRouter after the authentication middleware
router.use("/user", userRouter);
router.use("/blog", blogRouter);

export default router;
