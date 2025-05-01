import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = "123456"; // Replace with logged-in user's ID from authentication

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://sportin.onrender.com/api/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            currentUserId={currentUserId}
            onDelete={handleDeletePost}
          />
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",   
    alignItems: "center",      
    marginTop: "2vh",         
    gap: "2vh",         
    width: "100%",
    maxWidth: "600px",         
    margin: "3vh auto 1vh",  
  },
};

export default PostList;
