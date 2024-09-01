// models/user.mjs
import mongoose, { Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createTokenForUser } from "../services/authentication.mjs";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    salt: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "/public/images/default-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashPassword;

  next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("User not found!");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

  if (hashedPassword !== userProvidedHash) {
    throw new Error("Invalid Credentials!");
  }

  const token = createTokenForUser(user);
  
  return token;
};

const User = mongoose.model("User", userSchema);

export { User };
