import React from 'react';
import '../css/Auth.css';

const SignIn = () => {
  return (
    <div className="auth-container signin-bg">
      <div className="form-card">
        <h2>SignIN</h2>
        <form>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" placeholder="Value" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Value" />

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
