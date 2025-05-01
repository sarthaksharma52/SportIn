require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({ 
  origin: ["https://sportin-sx9a.onrender.com", "https://your-production-domain.com"], 
  credentials: true 
}));

// **Logging Middleware**
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// **Mongoose Connection**
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    setTimeout(connectDB, 5000);
  }
};

// --------------------
// Cloudinary Configuration (for posts routes)
// --------------------
const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --------------------
// Import and Mount Routers
// --------------------
const userroutes = require("./routes/user");
const postsRouter = require("./routes/posts");

// Mount posts routes on /api/posts
app.use("/api/posts", postsRouter);

// Mount user routes on /api (or consider using /api/users to avoid conflict)
app.use("/api", userroutes);

// --------------------
// Global Error Handling Middleware
// --------------------
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// --------------------
// Start Server
// --------------------
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
