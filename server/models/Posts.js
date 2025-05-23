const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    likes:{
        type: Number, default: 0 
        },
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User" 
    }, // Ensure the post is tied to a user
  }, { timestamps: true });
  
const Post = mongoose.model("Post", postSchema);

module.exports = Post;