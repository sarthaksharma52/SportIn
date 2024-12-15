import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleNavbar} 
        aria-expanded={isOpen ? "true" : "false"} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" end>
              Home <span className="sr-only"></span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/MyNetwork">My Network</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/messaging">Messaging</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/notification">Notification</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
        </ul>
        
        {/* Align the search form to the right */}
        <form className="form-inline my-2 my-lg-0 ml-auto left-nav">
          <input className="search form-control mr-sm-2" type="search" placeholder="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
