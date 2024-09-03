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

// Server Listener
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


