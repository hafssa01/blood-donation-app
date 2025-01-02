import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const RequestBloodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "",
    bloodGroup: "",
    location: "",
    hospital: "",
    reason: "",
    confirmEmergency: false,
    phoneNumber: "",
    user_type: "recipient",
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/submit-form", formData, {
          headers: { "Content-Type": "application/json" },
        });
        setToastMessage(response.data.message || "Blood request details submitted successfully!");
        setShowToast(true);
        setTimeout(() => navigate("/sent-request"), 3000);
      } catch (error) {
        setToastMessage(error.response?.data?.error || "An error occurred while submitting the form.");
        setShowToast(true);
      }
    } else {
      setErrors(newErrors);
      setToastMessage("Please fix the errors in the form.");
      setShowToast(true);
    }
  };

  const validate = (data) => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; // Example regex for a 10-digit phone number
    if (!data.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(data.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }
    if (!data.fullName) newErrors.fullName = "Full name is required.";
    if (!data.age) newErrors.age = "Age is required.";
    if (!data.sex) newErrors.sex = "Please select your sex.";
    if (!data.bloodGroup) newErrors.bloodGroup = "Blood group is required.";
    if (!data.location) newErrors.city = "location is required.";
    if (!data.hospital) newErrors.hospital = "Hospital name is required.";
    if (!data.reason) newErrors.reason = "Reason for blood request is required.";
    if (!data.confirmEmergency) newErrors.confirmEmergency = "Please confirm that this is an emergency.";
    return newErrors;
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: "100vh" }}>
        <Card className="p-4" style={{ width: "100%", maxWidth: "600px" }}>
          <h2 className="text-center mb-4">Request Blood</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Text className="text-danger">{errors.fullName}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
                  />
                  <Form.Text className="text-danger">{errors.age}</Form.Text>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sex</Form.Label>
                  <Form.Control
                    as="select"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    isInvalid={!!errors.sex}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                  <Form.Text className="text-danger">{errors.sex}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                as="select"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                isInvalid={!!errors.bloodGroup}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Form.Control>
              <Form.Text className="text-danger">{errors.bloodGroup}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                isInvalid={!!errors.location}
              />
              <Form.Text className="text-danger">{errors.location}</Form.Text>
            </Form.Group>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber}
                  />
                  <Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Hospital</Form.Label>
              <Form.Control
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                isInvalid={!!errors.hospital}
              />
              <Form.Text className="text-danger">{errors.hospital}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason for Blood Request</Form.Label>
              <Form.Control
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                isInvalid={!!errors.reason}
              />
              <Form.Text className="text-danger">{errors.reason}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="confirmEmergency"
                label="I confirm that this is an emergency."
                checked={formData.confirmEmergency}
                onChange={handleChange}
                isInvalid={!!errors.confirmEmergency}
              />
              <Form.Text className="text-danger">{errors.confirmEmergency}</Form.Text>
            </Form.Group>
            <Button
              type="submit"
              className="w-100 mb-2"
              style={{
                backgroundColor: "#ff2c2c",
                borderRadius: "60px",
                borderColor: "#ff2c2c",
                color: "white",
              }}
            >
              Request Blood
            </Button>
          </Form>
        </Card>
      </div>
      <div className="d-flex justify-content-center">
      <button
        className="btn  w-45"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px",
           backgroundColor: 'white', borderColor: "red",
            color:'red' 
          }}
      >
        Back to Dashboard
      </button>
      </div>
      <Footer />
      <ToastContainer position="top-center" className="mt-5">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RequestBloodForm;