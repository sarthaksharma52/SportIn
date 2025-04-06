import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostForm = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Preview image before upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!image) return toast.error("Please select an image");

    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (!token) {
      return toast.error("You must be logged in to create a post");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Send token here
        },
      });
      toast.success("Post created successfully!");
      console.log(res.data);

      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      toast.error("Failed to upload post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create a Post</h2>

        {preview && <img src={preview} alt="Preview" style={styles.preview} />}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />

        <textarea
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        {/* Live description preview with formatting preserved */}
        {description && (
          <div style={styles.descriptionPreview}>
            {description}
          </div>
        )}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  preview: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
  },
  fileInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
    resize: "none",
  },
  descriptionPreview: {
    whiteSpace: "pre-wrap", // 🔥 this preserves spacing and line breaks
    textAlign: "left",
    border: "1px dashed #ccc",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    color: "#333",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
    opacity: "1",
  },
};

export default PostForm;
