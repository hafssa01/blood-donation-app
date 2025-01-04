import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import axios from "axios";
import Footer from "../components/Footer";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate(); // React Router's navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update errors in real-time
    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/login`, formData, {
          headers: { "Content-Type": "application/json" },
        });

        // Store the JWT token in localStorage
        const { access_token } = response.data; // Adjust based on your response structure
        localStorage.setItem('token', access_token);
        
        setToastMessage(response.data.message || "Login successful!");
        setShowToast(true);
        setLoading(false);
        // Navigate to the dashboard after a short delay
        setTimeout(() => {
          navigate("/dashboard"); // Adjust the route to match your dashboard path
        }, 1000);
      } catch (error) {
        setToastMessage(error.response?.data?.error || "An error occurred during login.");
        setShowToast(true);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  return (
    <>
      <NavigationBar /> 
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-5 w-100" style={{ maxWidth: '600px', borderRadius: '15px' }}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="mt-4 w-100"
              disabled={loading}
              variant="danger"
              type="submit"
              style={{
                backgroundColor: '#ff2c2c',
                borderRadius: '20px',
                color: 'white',
                border: 'none',
              }}
            >
              {loading ? (
          <>
            <span 
              className="spinner-border spinner-border-sm me-2" 
              role="status" 
              aria-hidden="true">
            </span>
            Please wait...
          </>
        ) : (
          'Login'
        )}
              
            </Button>

            <p className="text-center mt-3">
              Don't have an account? <a href="/register" className="text-primary">Register</a>
            </p>
          </Form>
        </Card>

        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <Footer/>
    </>
  );
};

export default LoginForm