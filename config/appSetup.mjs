// config/appSetup.js
import express from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setupApp = (app) => {
  app.set("view engine", "ejs");
  app.set("views", resolve(__dirname, "../views"));
  app.use(express.static(resolve(__dirname, "../public")));
  app.use(express.urlencoded({ extended: false }));
};

export default setupApp;
