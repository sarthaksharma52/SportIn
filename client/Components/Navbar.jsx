import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const navigate = useNavigate();
  const formatName = (name) => {
    if (!name) return null;
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const [name, setName] = useState(formatName(localStorage.getItem("name")));
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = !!name;

  useEffect(() => {
    const updateName = () => setName(formatName(localStorage.getItem("name")));

    window.addEventListener("storage", updateName);
    window.addEventListener("loginStatusChange", updateName);

    return () => {
      window.removeEventListener("storage", updateName);
      window.removeEventListener("loginStatusChange", updateName);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setName(null);
    navigate('/signin');

    window.dispatchEvent(new Event("loginStatusChange"));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        aria-expanded={isOpen} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/MyNetwork">My Network</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/post">Posts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/messaging">Messaging</NavLink>
              </li>
            </>
          )}

          <li className="nav-item">
            <NavLink className="nav-link" to="/news">News</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/notification">Notification</NavLink>
          </li>

          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              role="button" 
              data-bs-toggle="dropdown"
            >
              {isLoggedIn ? name : "Guest"}
            </a>
            <ul className="dropdown-menu">
              {!isLoggedIn ? (
                <>
                  <li>
                    <NavLink className="dropdown-item" to="/signup">Sign Up</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/signin">Sign In</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="btn dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink className="dropdown-item" to="/profile">Profile</NavLink>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0 ml-auto left-nav">
          <input 
            className="search form-control mr-sm-2" 
            type="search" 
            placeholder="Search" 
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
