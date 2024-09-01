// app.mjs
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";
import mainRouter from "./routes/index.mjs"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const url = process.env.Connection_URL;

// Database Connection
mongoose
  .connect(url)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Error:", err));

// __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));

// Main Router
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
