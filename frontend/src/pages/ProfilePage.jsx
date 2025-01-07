import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validate environment variables
  useEffect(() => {
    if (!import.meta.env.VITE_BACKEND_API_URL) {
      console.error('Backend API URL not configured');
      setError('Application configuration error');
      return;
    }
  }, []);

  // Input validation function
  const validateProfileData = () => {
    if (!profileData.firstName?.trim() || !profileData.lastName?.trim()) {
      setError('First name and last name are required');
      return false;
    }

    if (profileData.phone && !/^\+?[\d\s-]+$/.test(profileData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  // Fetch Profile Data
  const fetchProfileData = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setProfileData(response.data);
    } catch (err) {
      console.error('Profile fetch error:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(err.response?.data?.message || 'Error fetching profile data. Please log in again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!validateProfileData()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setSuccessMessage('Profile updated successfully!');
      // Update local state with the response data in case the server modified anything
      if (response.data) {
        setProfileData(response.data);
      }
    } catch (err) {
      console.error('Profile update error:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError(err.response?.data?.message || 'Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    let isMounted = true;

    const initializeProfile = async () => {
      if (!import.meta.env.VITE_BACKEND_API_URL) return;
      
      if (isMounted) {
        await fetchProfileData();
      }
    };

    initializeProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ fontSize: '3rem' }}>
          My Profile
        </h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <div>
            <div className="text-center mb-5">
              <FaUserCircle size={150} color="#ff2c2c" className="mb-4" />
              {successMessage && (
                <p className="text-success text-center">{successMessage}</p>
              )}
              
              <form
                onSubmit={handleUpdateProfile}
                className="mx-auto p-4"
                style={{
                  maxWidth: '500px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <div className="form-group mb-3 text-start">
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={profileData.email}
                    readOnly
                    disabled
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    value={profileData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234-567-8900"
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  disabled={loading}
                  style={{
                    backgroundColor: "#ff2c2c",
                    borderRadius: "20px",
                    color: "white",
                    border: "none",
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            className="btn w-45"
            onClick={() => navigate("/dashboard")}
            style={{
              marginTop: "20px",
              backgroundColor: 'white',
              borderColor: "#ff2c2c",
              borderRadius: "20px",
              color: "#ff2c2c",
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;