import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Toast, ToastContainer, Col, Row, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavBar";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    sex: "",
    phone: "",
    email: "",
    location:"",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required.";
    if (!data.lastName) newErrors.lastName = "Last name is required.";
    if (!data.birthDate) newErrors.birthDate = "Birth date is required.";
    if (!data.sex) newErrors.sex = "Please select your sex.";
    if (!data.phone || !/^\d+$/.test(data.phone)) newErrors.phone = "Phone number must contain only digits.";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Valid email is required.";
    if (!data.location) newErrors.location = "Location is required.";
    if (!data.password || data.password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
    if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/register`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setToastMessage(response.data.message || "Registration successful!");
        setShowToast(true);
        setLoading(false);
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        setToastMessage(error.response?.data?.error || "An error occurred during registration.");
        setShowToast(true);
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
      setToastMessage("Please fix the errors in the form.");
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: "100vh" }}>
        <Card className="p-4" style={{ width: "100%", maxWidth: "600px" }}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Text className="text-danger">{errors.firstName}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Text className="text-danger">{errors.lastName}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.birthDate && !!errors.birthDate}
              />
              <Form.Text className="text-danger">{errors.birthDate}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                as="select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.sex && !!errors.sex}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
              <Form.Text className="text-danger">{errors.sex}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && !!errors.phone}
              />
              <Form.Text className="text-danger">{errors.phone}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.location && !!errors.location}
              />
              <Form.Text className="text-danger">{errors.location}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Text className="text-danger">{errors.confirmPassword}</Form.Text>
            </Form.Group>
            <Button
              className="mt-4 w-100"
              disabled={loading}
              variant="danger"
              type="submit"
              style={{
                backgroundColor: "#ff2c2c",
                borderRadius: "20px",
                color: "white",
                border: "none",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Please wait...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </Form>
        </Card>

        <ToastContainer position="top-end" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
      <Footer />
    </>
  );
};

export default RegisterForm;
