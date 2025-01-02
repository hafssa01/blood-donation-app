import React from 'react';
import { User, LogIn, LogOut, Heart } from 'lucide-react'; // Add necessary icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.png'; // Adjust path if necessary

const NavigationBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm top w-100 z-50 mb-3">
      <div className="container">
        {/* Brand with Logo */}
        <a className="navbar-brand text-black" href="/">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: '80px' }}
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
          <ul className="navbar-nav mx-auto">
            {['Home', 'About Us', 'Contact Us', 'FAQs'].map((item, index) => (
              <li className="nav-item mx-3" key={index}>
                <a
                  className="nav-link"
                  href={`/${item.toLowerCase().replace(' ', '')}`}
                  style={{
                    color: '#6c757d', // Default color (gray)
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')} // Hover color (red)
                  onMouseLeave={(e) => (e.target.style.color = '#6c757d')} // Reset color
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="/profile"
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <User size={20} />
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="/donate"
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <Heart size={20} />
                    Donate Blood
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="/request"
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <Heart size={20} />
                    Request Blood
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link d-flex align-items-center gap-2"
                    onClick={onLogout}
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="/login"
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <User size={20} />
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="/register"
                    style={{
                      color: '#6c757d',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#ff2c2c')}
                    onMouseLeave={(e) => (e.target.style.color = '#6c757d')}
                  >
                    <LogIn size={20} />
                    Register
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
