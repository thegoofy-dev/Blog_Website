// services/authentication.mjs
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

  const token = jwt.sign(payload, secret);

  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

export { createTokenForUser, validateToken };
