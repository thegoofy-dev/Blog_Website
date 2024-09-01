// routes/user.mjs
import { Router } from "express";
import {
  handlerForSignUp,
  handlerForSignIn,
  handlerForLogout,
} from "../controllers/user.mjs";

const router = Router();

// SignIn Get Route
router.get("/signin", (req, res) => {
  res.render("signin");
});

// SignUp Get Route
router.get("/signup", (req, res) => {
  res.render("signup");
});

// SignIn Post Route
router.post("/signin", handlerForSignIn);

// SignUp Post Route
router.post("/signup", handlerForSignUp);

// Logout Get Route
router.get("/logout", handlerForLogout);

export default router;
