import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import Item from "./model/schema.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // Restrict CORS to specific origins
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace only in development
  });
});

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  ); // generating the access token

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  }; // returning the data
};

const generateUsername = async (email) => {
  let username = email.split("@")[0]; // getting the username then splitting it @gmail.com

  let usernameExists = await User.exists({
    "personal_info.username": username,
  }).then((result) => result); // checking if the username already exist

  usernameExists ? (username += nanoid().substring(0, 5)) : ""; // if username already exist, adding nanoid to it, to make it unique

  return username;
};





app.get("/test", (req, res) => {
  console.log("Test endpoint called");
  res.send("Test successful");
});



// Routes for GET /products/:productId
app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params; // Ambil productId dari URL
    const product = await Item.findOne({ id: productId }); // Cari produk berdasarkan id

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product); // Kirim data produk sebagai respons
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body); // Buat instance baru dari model Item
    const savedItem = await newItem.save(); // Simpan instance baru ke mongodb
    res.status(201).json(savedItem); // kirim response dengan data yang disimpan
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save item to the database" });
  }
})

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("\nShutting down server gracefully...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1); // Exit with failure
  }
}

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find(); 
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

startServer();

export default app;
