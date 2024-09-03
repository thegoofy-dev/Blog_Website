import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function validateToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Invalid token:", error);
    throw error;
  }
}

export { createTokenForUser, validateToken };
