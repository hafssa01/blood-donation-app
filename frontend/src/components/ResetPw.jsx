import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from './NavBar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPw = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Confirm new password is required';
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Sending the PUT request with the new password
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_API_URL}/reset-password`, 
          { newPassword: formData.newPassword }, 
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        if (response.status === 200) {
          setMessage('Password reset successfully. Redirecting to login...');
          setToastType('success');
          setShowToast(true);
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setMessage('Error resetting password. Please try again.');
          setToastType('error');
          setShowToast(true);
        }
      } catch (error) {
        setMessage('Error resetting password. Please try again.');
        setToastType('error');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setMessage('Please fix the errors in the form.');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <NavigationBar />
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4" style={{ fontSize: '3rem' }}>Reset your password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.newPassword}
                  required
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirmNewPassword" className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmNewPassword}
                  required
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmNewPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: '#ff2c2c',
                    borderRadius: '20px',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            backgroundColor: "transparent", 
            border: "1px solid #ccc", 
            color: toastType === 'error' ? 'red' : 'green',
          }}
        >
          <Toast.Header>
            <strong className="me-auto" style={{ color: "#333" }}>Notification</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </>
  );
};

export default ResetPw;
