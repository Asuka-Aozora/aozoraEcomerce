import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import User from "./config/User.js";
import Item from "./schema/Database.js";

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

app.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body; // getting the data from frontend

  // validating the data from frontend
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 letters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email); // generating the username

    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    }); // creating the user

    user
      .save() // saving the user to mongodb
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      }) // sending the response
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email already exist" });
        } // if email already exist

        return res.status(500).json({ error: err.message }); // if any other error
      });
  }); // hashing the password
});

app.post("/signin", (req, res) => {
  let { email, password } = req.body; // getting the data from frontend

  // validating the data from frontend
  User.findOne({ "personal_info.email": email }) // finding the user
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      } // if user not found

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "error occurred while login please try again" });
        } // if any error

        if (!result) {
          return res.status(403).json({ error: "Incorrect password" }); // if password is incorrect
        } else {
          return res.status(200).json(formatDataToSend(user)); // if password is correct then sending the response
        }
      }); // comparing the password with the hashed password from database
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }); // if any error
});

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

startServer();

export default app;
