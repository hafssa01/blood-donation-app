import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Card } from "react-bootstrap";
import { useNavigate, Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavigationBar from "../components/NavBar";
import axios from "axios";

const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(validate({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = validate(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/login`, 
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        const { access_token, user } = response.data;
        login(user, access_token); // Use auth context login
        localStorage.setItem('token', access_token);
        setToastMessage("Login successful!");
        setShowToast(true);
        setTimeout(() => navigate("/dashboard"), 1000);
      } catch (error) {
        setToastMessage(error.response?.data?.error || "Login failed");
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setLoading(false);
    }
  };

  const validate = (data) => ({
    ...(data.email ? {} : { email: 'Email is required' }),
    ...(data.password ? {} : { password: 'Password is required' })
  });

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
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Please wait...
                </>
              ) : 'Login'}
            </Button>

          </Form>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register" style={{ color: '#ff2c2c' }}>Register</Link></p>
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
    </>
  );
};

export default LoginForm;