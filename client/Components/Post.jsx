import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = ({ post, onDelete, currentUserId }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [localUserId, setLocalUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // Helper function to format the username
  const formatUsername = (name) => {
    if (!name) return "Anonymous";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setLocalUserId(storedUser._id);
    }
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${post._id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/posts/${post._id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/posts/${post._id}/comment`,
        { comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleComments = () => {
    if (!showComments) fetchComments();
    setShowComments(!showComments);
  };

  // Adjust comment popup style for mobile vs. desktop
  const commentPopupStyle = isMobile
    ? { ...styles.commentPopup, position: "static", marginTop: "10px" }
    : styles.commentPopup;

  return (
    <div style={styles.postContainer}>
      <div style={styles.postCard}>
        <h3 style={styles.username}>{formatUsername(post.user?.name)}</h3>
        <img src={post.imageUrl} alt="Post" style={styles.image} />
        {/* Using whiteSpace: "pre-line" to maintain only line breaks */}
        <p style={styles.description}>{post.description}</p>
        <div style={styles.actions}>
          <button style={styles.likeButton} onClick={handleLike}>
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <button style={styles.commentButton} onClick={toggleComments}>
            💬 Comment
          </button>
          {localUserId &&
            post.user &&
            post.user._id.toString() === localUserId.toString() && (
              <button
                style={styles.deleteButton}
                onClick={() => onDelete(post._id)}
              >
                🗑️ Delete
              </button>
            )}
        </div>
      </div>

      {showComments && (
        <div style={commentPopupStyle}>
          <h4>Comments</h4>
          <div style={styles.commentList}>
            {comments.length > 0 ? (
              comments.map((c) => (
                <p key={c._id} style={styles.commentItem}>
                  <strong>{formatUsername(c.user?.name)}</strong>: {c.comment}
                </p>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={styles.commentInput}
            />
            <button type="submit" style={styles.submitCommentButton}>
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  postContainer: {
    position: "relative",
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto 20px",
  },
  postCard: {
    flex: 1,
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
    width: "100%",
    maxHeight: "40vh",
    objectFit: "contain",
    borderRadius: "10px",
  },
  // Updated description style to maintain line breaks (newlines) only
  description: {
    marginTop: "10px",
    fontSize: "16px",
    whiteSpace: "pre-line",
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
  commentPopup: {
    position: "absolute",
    top: "0",
    right: "-320px",
    width: "300px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  commentList: {
    maxHeight: "200px",
    overflowY: "auto",
    padding: "5px",
    marginBottom: "10px",
  },
  commentItem: {
    padding: "5px",
    borderBottom: "1px solid #ddd",
  },
  commentForm: {
    display: "flex",
    gap: "10px",
  },
  commentInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitCommentButton: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Post;
