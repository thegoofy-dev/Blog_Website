import { Router } from "express";
import userRouter from "./user.mjs";
import { checkForAuthenticationCookie } from "../middlewares/authentication.mjs";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser());
router.use(checkForAuthenticationCookie('token'));

// Route to render the home page
router.get("/home", (req, res) => {
    res.render("home", {
      user: req.user,
    });
  });

// Use userRouter after the authentication middleware
router.use("/user", userRouter);

export default router;
