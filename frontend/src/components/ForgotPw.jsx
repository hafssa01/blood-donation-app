import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavBar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPw = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'A valid email is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Simulate the behavior without sending an actual email
        setSuccessMessage('Navigating to the password reset page...');
        setErrorMessage('');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 1000);
      } catch (error) {
        setErrorMessage('Error processing your request. Please try again.');
        setSuccessMessage('');
        setToastType('error');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4" style={{ fontSize: '3rem' }}>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Enter your email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  required
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
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
                  {loading ? 'Processing...' : 'Continue'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            backgroundColor: "transparent", // Colorless background
            border: "1px solid #ccc", // Optional border for visibility
            color: toastType === 'error' ? 'red' : 'green', // Text color based on success/error
          }}
        >
          <Toast.Header>
            <strong className="me-auto" style={{ color: "#333" }}>Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastType === 'error' ? errorMessage : successMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </>
  );
};

export default ForgotPw;
