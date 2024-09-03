import multer from 'multer';
import path from 'path';
import { User } from "../models/user.mjs";

// Set up storage engine
const storage = multer.diskStorage({
  destination: './public/profileImages/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profileImageURL');

// Handlers
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

async function handlerForSignUp(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.render("signup", {
        error: err.message,
      });
    }

    const { fullName, email, password } = req.body;
    const profileImageURL = req.file ? `/profileImages/${req.file.filename}` : "/images/user-default.jpg";

    try {
      await User.create({ fullName, email, password, profileImageURL });
      res.redirect("/user/signin");
    } catch (error) {
      console.error("Signup Error:", error.message);
      res.render("signup", {
        error: "Failed to create account. Please try again.",
      });
    }
  });
}

function handlerForLogout(req, res) {
  res.clearCookie("token").redirect("/home");
}

export { handlerForSignUp, handlerForSignIn, handlerForLogout };
