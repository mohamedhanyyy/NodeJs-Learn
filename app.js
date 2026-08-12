const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const createCategory = require("./services/category_service");
const CategoryModel = require("./models/category_model");
const dbCollection = require("./config/database");
// 1. Load environment variables first
dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 8000;



// 2. Connect to MongoDB
dbCollection();

// 3. Global Middleware (MUST come before routes)
app.use(express.json()); // Parses JSON body
app.use(express.static("public"));
app.use(express.static("node_modules"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");

// 5. Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/category", async (req, res) => {
  try {
    const result = await createCategory(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/category", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res
      .status(200)
      .json({ message: "Category fetched successfully", data: categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Error fetching categories" });
  }
});



// 6. Server Listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
