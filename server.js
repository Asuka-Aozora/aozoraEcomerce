import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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

startServer();

export default app;
