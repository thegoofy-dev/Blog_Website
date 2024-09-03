// app.mjs
import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.mjs";
import setupApp from "./config/appSetup.mjs";
import connectDB from "./config/db.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Database Connection
connectDB();

// Application Setup
setupApp(app);

// Main Router
app.use(mainRouter);

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server Listener
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit process with failure
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit process with failure
});