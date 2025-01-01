import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios"; 

const DonateBloodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "",
    weight: "",
    bloodGroup: "",
    location: "",
    medicalIssues: "",
    confirmSick: false,
    confirmBlood: false,
    phoneNumber: "",
    user_type: "donor",
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
        setToastMessage(response.data.message || "Blood donation details submitted successfully!");
        setShowToast(true);
        setTimeout(() => navigate("/thank-you"), 3000);
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
    if (!data.weight) newErrors.weight = "Weight is required.";
    if (!data.bloodGroup) newErrors.bloodGroup = "Blood group is required.";
    if (!data.location) newErrors.location = "Location is required.";
    if (!data.confirmSick) newErrors.confirmSick = "Please confirm that you are not sick.";
    if (!data.confirmBlood) newErrors.confirmBlood = "Please confirm that you haven't given blood in the last 3 months.";
    return newErrors;
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: "100vh" }}>
        <Card className="p-4" style={{ width: "100%", maxWidth: "600px" }}>
          <h2 className="text-center mb-4">Donate Blood</h2>
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
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  isInvalid={!!errors.weight}
                />
                <Form.Text className="text-danger">{errors.weight}</Form.Text>
              </Form.Group>
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
                <Form.Check
                  type="checkbox"
                  name="confirmSick"
                  label="I confirm that I am not sick."
                  checked={formData.confirmSick}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmSick}
                />
                <Form.Text className="text-danger">{errors.confirmSick}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="confirmBlood"
                  label="I confirm that I have not donated blood in the last 3 months."
                  checked={formData.confirmBlood}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmBlood}
                />
                <Form.Text className="text-danger">{errors.confirmBlood}</Form.Text>
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
                Donate
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
  
  export default DonateBloodForm;