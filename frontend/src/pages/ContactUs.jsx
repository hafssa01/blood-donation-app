import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the specific field when it is corrected
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName || !/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name is required and should contain only letters';
    }
    if (!formData.lastName || !/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name is required and should contain only letters';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid email is required';
    }
    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
      });
      setErrors({});
      // Navigate to the messagesent page
      navigate('/messagesent');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="d-flex flex-column align-items-center my-5">
        <h1 className="text-center mb-5">Contact Us</h1>
        <Row className="w-100 justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.firstName && !!errors.firstName}
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.lastName && !!errors.lastName}
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="subject" className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  as="textarea"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.subject && !!errors.subject}
                  style={{ borderRadius: '20px' }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: '#ff2c2c',
                    borderRadius: '20px',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  Send
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;