const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

const Post = require("../models/Posts");
const Comment = require("../models/CommentLike");

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
    const imageUrl = req.file.path;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User ID missing." });
    }

    const newPost = new Post({
      description,
      imageUrl,
      user: req.user._id,
    });

    await newPost.save();
    // Populate the user field so the response includes the user's name
    await newPost.populate("user", "name");

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Like Post Route
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes = (post.likes || 0) + 1;
    await post.save();
    res.status(200).json({ message: "Post liked", likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Comment Route
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const newComment = new Comment({
      comment,
      post: req.params.id,
      user: req.user._id,
    });

    await newComment.save();
    // Populate the user field to include the name in the response
    await newComment.populate("user", "name");

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Comments for a Post Route
router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Posts Route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Post Route
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user", "_id");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own posts" });
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
