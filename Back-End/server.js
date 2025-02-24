import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Item from "./model/schema.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

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



app.get("/test", (req, res) => {
  console.log("Test endpoint called");
  res.send("Test successful");
});

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

startServer();

export default app;
