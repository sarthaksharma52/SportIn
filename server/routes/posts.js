const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware"); // Import your auth middleware

const Post = require('../models/Posts');

// Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});
const upload = multer({ storage });

// Create Post Route
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL

    // Check using req.user._id
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User ID missing." });
    }

    const newPost = new Post({
      description,
      imageUrl,
      user: req.user._id, // Use the _id from authMiddleware
    });

    await newPost.save();

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Posts Route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Post Route
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user is the owner of the post using req.user._id
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }

    await post.remove(); // Remove the post from the database
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
