import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Validasi MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1); // Exit jika MONGO_URI tidak ada
}

const connectDB = async () => {
  try {
    // Koneksi ke MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);

    // Graceful shutdown
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    throw err; // Throw error agar bisa ditangani di server.js
  }
};

export default connectDB;
