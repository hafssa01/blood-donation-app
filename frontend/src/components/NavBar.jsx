import React from 'react';
import { User, LogIn, LogOut, Heart, UserPlus, Share2 } from 'lucide-react';  // Add necessary icons
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';  // Adjust path if necessary

const NavigationBar = ({ isLoggedIn, onLogout }) => {
  // Inline styles for the hover effect
  const linkStyle = {
    color: '#6c757d',  // Default color (gray)
  };

  const linkHoverStyle = {
    color: '#ff2c2c',  // Hover color (red)
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm top w-100 z-50 mb-9"> {/* Added mb-3 */}
      <div className="container">
        {/* Brand with Logo */}
        <a className="navbar-brand text-black" href="/">
          <img
            src={logo}  // Source of the logo image
            alt="Logo"
            className="img-fluid"  // Makes the image responsive
            style={{ maxHeight: '80px' }}  // Set maximum height to control the size
          />
        </a>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto"> {/* Centers the Home link */}
            <li className="nav-item mx-3">
              <a
                className="nav-link"
                href="/"
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = linkStyle.color}
              >
                Home
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link"
                href="/"
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = linkStyle.color}
              >
                About Us
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link"
                href="/"
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = linkStyle.color}
              >
                Cantact Us
              </a>
            </li>
            <li className="nav-item mx-3">
              <a
                className="nav-link"
                href="/"
                style={linkStyle}
                onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = linkStyle.color}
              >
                FAQs
              </a>
            </li>
          </ul>

          {/* If logged in, show additional buttons */}
          {isLoggedIn ? (
            <ul className="navbar-nav ms-auto"> {/* Align buttons to the right */}
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="/profile"
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  <User size={20} />
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="/donate"
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  <Heart size={20} />
                  Donate Blood
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="/request"
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  <Heart size={20} />
                  Request Blood
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link d-flex align-items-center gap-2 "
                  style={linkStyle}
                  onClick={onLogout}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            // If not logged in, show login/register options
            <ul className="navbar-nav ms-auto"> {/* Align Login and Register to the right */}
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="/login"
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  <User size={20} />
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link d-flex align-items-center gap-2"
                  href="/register"
                  style={linkStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  <LogIn size={20} />
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;