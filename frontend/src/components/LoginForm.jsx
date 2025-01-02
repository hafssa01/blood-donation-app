import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import GoogleOAuthLogin from "../components/GoogleAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      // Simulate successful login
      setToastMessage('Login successful!');
      setShowToast(true);

      // Dispatch login action
      dispatch(login({ email: formData.email }));

      // Navigate to the dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
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
              variant="danger"
              type="submit"
              style={{
                backgroundColor: '#ff2c2c',
                borderRadius: '20px',
                color: 'white',
                border: 'none',
              }}
            >
              Login
            </Button>

            <p className="text-center mt-3">
              Don't have an account? <a href="/register" className="text-primary">Register</a>
            </p>
          </Form>
          <div className="mt-4">
            <GoogleOAuthLogin />
          </div>
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
      <Footer />
    </>
  );
};

export default LoginForm;