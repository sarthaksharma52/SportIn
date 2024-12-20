import React, { useState } from 'react';
import axios from 'axios';
import '../css/Auth.css';

const SignIn = () => {

  const [formData,setFormData] = useState(
    {
    email: '',
    password: '',
    }
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost3000/signin', formData);
      console.log(response.data.message);
      localStorage.setItem('token' , response.data.token);
    }catch(error){
      console.log(error.response?.data?.message || "Signin Failed");
    }
  }

  return (
    <div className="auth-container signin-bg">
      <div className="form-card">
        <h2>SignIN</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" onChange={handleChange} placeholder="Value" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} placeholder="Value" />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
