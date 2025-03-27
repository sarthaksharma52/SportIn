import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (userName, token) => {
    localStorage.setItem("name", userName);
    localStorage.setItem("token", token);

    // Trigger navbar update event
    window.dispatchEvent(new Event("loginStatusChange"));
    
    // Navigate to home page
    navigate('/');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3000/api/signin', formData);
      const { token, name, message } = response.data;

      console.log(message || "Sign in successful");

      // ✅ Call handleLogin to store data and refresh navbar
      handleLogin(name, token);
    } catch (error) {
      setError(error.response?.data?.error || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="auth-container signin-bg">
      <div className="form-card">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
