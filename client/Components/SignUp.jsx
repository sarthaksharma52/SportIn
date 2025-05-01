import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../css/Signup.css';

const SignUp = ({Data}) => {
  const [formData, setFormData] = useState({
    name: '',
    sports: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('https://sportin.onrender.com/api/signup' , formData);
      console.log(response.data.message);
      navigate('/signin');
    }catch(error){
      console.log(error.response?.data?.error || "Signup Failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sports">Sports</label>
            <input
              type="text"
              id="sports"
              placeholder="Enter the sport(s) you play"
              value={formData.sports}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <small className="form-text">We'll never share your email.</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
