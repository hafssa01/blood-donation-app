import React from 'react';
import { User, LogIn, LogOut, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const linkStyle = { color: '#6c757d', fontWeight: 'bold', transition: 'transform 0.2s' };
  const linkHoverStyle = { color: '#ff2c2c', transform: 'scale(1.1)' };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm top w-100 z-50 mb-9">
      <div className="container">
        <Link className="navbar-brand text-black" to="/">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxHeight: '70px' }} />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mx-5" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color} onMouseOver={(e) => e.target.style.transform = linkHoverStyle.transform} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color} onMouseOver={(e) => e.target.style.transform = linkHoverStyle.transform} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/contact" style={linkStyle} onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} onMouseLeave={(e) => e.target.style.color = linkStyle.color} onMouseOver={(e) => e.target.style.transform = linkHoverStyle.transform} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                Contact Us
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/donate" style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <Heart size={20} /> Donate Blood
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/request" style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <Heart size={20} /> Request Blood
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <User size={20} /> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <LogOut size={20} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <LogIn size={20} /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" style={{ color: '#6c757d' }} onMouseEnter={(e) => e.target.style.color = '#ff2c2c'} onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                    <User size={20} /> Register
                  </Link>
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