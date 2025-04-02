import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, onDelete, currentUserId }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [localUserId, setLocalUserId] = useState(null);

  useEffect(() => {
    // Get the logged-in user ID from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setLocalUserId(storedUser._id);
    }
  }, []);

  // Handle Like Button Click
  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3000/api/posts/${post._id}/like`);
      setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // Handle Delete Post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onDelete(post._id); // Remove the post from UI
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <div style={styles.postCard}>
      {/* User Name */}
      <h3 style={styles.username}>{post.user?.name || "Anonymous"}</h3>

      {/* Post Image */}
      <img src={post.imageUrl} alt="Post" style={styles.image} />

      {/* Post Description */}
      <p style={styles.description}>{post.description}</p>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.likeButton} onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likes}
        </button>
        <button style={styles.commentButton}>💬 Comment</button>

        {/* Delete button - Only visible if the logged-in user created the post */}
        {localUserId && post.userId === localUserId && (
          <button style={styles.deleteButton} onClick={handleDelete}>
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  postCard: {
    width: "100%",           // Full width of container (maxWidth set in PostList)
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "left",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  username: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  image: {
    width: "100%",           // Fill the container width
    maxHeight: "60vh",       // Cap height at 60% of viewport height
    objectFit: "cover",      // Adjust image cropping to cover container width
    borderRadius: "10px",
  },
  description: {
    marginTop: "10px",
    fontSize: "16px",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  likeButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  commentButton: {
    padding: "8px 12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Post;
