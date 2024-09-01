import { User } from "../models/user.mjs";

async function handlerForSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/home");
  } catch (error) {
    console.error("Signin Error:", error.message);
    res.render("signin", {
      error: "Invalid Credentials! Please re-check your email or password.",
    });
  }
}

async function handlerForSignUp(params) {
  const { fullName, email, password } = req.body;
  try {
    await User.create({ fullName, email, password });
    res.redirect("/signin");
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.render("signup", {
      error: "Failed to create account. Please try again.",
    });
  }
}

function handlerForLogout(req, res) {
  res.clearCookie("token").redirect("/home");
}

export { handlerForSignUp, handlerForSignIn, handlerForLogout };
