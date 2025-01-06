import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard'; // Import the card component
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

  // Fetch Profile Data
  const fetchProfileData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProfileData(response.data);
    } catch (err) {
      setError('Error fetching profile data. Please log in again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/profile`, profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
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
              {/* Profile Icon */}
              <FaUserCircle size={150} color="#ff2c2c" className="mb-4" />
              {successMessage && <p className="text-success text-center">{successMessage}</p>}
              
              {/* Profile Card */}
              <div className="mb-4 d-flex justify-content-center">
                <div className="col-md-6 mx-auto">
                  <ProfileCard user={profileData} />
                </div>
              </div>
                
              {/* Profile Details Form */}
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
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, lastName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
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
                    onChange={(e) =>
                      setProfileData({ ...profileData, location: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3 text-start">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#ff2c2c",
                    borderRadius: "20px",
                    color: "white",
                    border: "none",
                  }}
                >
                  Save Changes
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
