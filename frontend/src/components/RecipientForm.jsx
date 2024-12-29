import React, { useState, useEffect } from "react";
import { Form, Button, Toast, ToastContainer, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavBar";
import Footer from "./Footer";

const RequestBloodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "",
    bloodGroup: "",
    country: "",
    city: "",
    hospital: "",
    reason: "",
    confirmEmergency: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`https://api.teleport.org/api/urban_areas/slug:${formData.country}/cities/`)
        .then((response) => response.json())
        .then((data) => setCities(data));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: type === "checkbox" ? checked : value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0 && (formData.confirmEmergency || formData.confirmSick && formData.confirmBlood)) {
        try {
            const response = await axios.post("http://localhost:5000/submit-form", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setToastMessage(response.data.message || "Blood request details submitted successfully!");
            setShowToast(true);
            setTimeout(() => navigate("/thank-you"), 3000); // Adjust the navigation path as needed
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

    // Full name validation: only alphabetic characters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!data.fullName) {
      newErrors.fullName = "Full name is required.";
    } else if (!nameRegex.test(data.fullName)) {
      newErrors.fullName = "Full name must only contain letters and spaces.";
    }

    // City validation: no numbers allowed
    if (data.city && !nameRegex.test(data.city)) {
      newErrors.city = "City must only contain letters and spaces.";
    }

    if (!data.age) {
      newErrors.age = "Age is required.";
    } else if (parseInt(data.age) < 18) {
      newErrors.age = "Age must be 18 or above.";
    }

    if (!data.sex) {
      newErrors.sex = "Please select your sex.";
    }

    if (!data.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required.";
    }

    if (!data.country) {
      newErrors.country = "Country is required.";
    }

    if (!data.city) {
      newErrors.city = "City is required.";
    }

    if (!data.hospital) {
      newErrors.hospital = "Hospital name is required.";
    }

    if (!data.reason) {
      newErrors.reason = "Reason for blood request is required.";
    }

    // Checkboxes validation
    if (!data.confirmEmergency) {
      newErrors.confirmEmergency = "Please confirm that this is an emergency.";
    }

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
                    onBlur={handleBlur}
                    isInvalid={touched.fullName && !!errors.fullName}
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
                    onBlur={handleBlur}
                    isInvalid={touched.age && !!errors.age}
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
                    onBlur={handleBlur}
                    isInvalid={touched.sex && !!errors.sex}
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
                onBlur={handleBlur}
                isInvalid={touched.bloodGroup && !!errors.bloodGroup}
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.country && !!errors.country}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.cca3} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-danger">{errors.country}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City (Zone)</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.city && !!errors.city}
              />
              <Form.Text className="text-danger">{errors.city}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hospital</Form.Label>
              <Form.Control
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.hospital && !!errors.hospital}
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
                onBlur={handleBlur}
                isInvalid={touched.reason && !!errors.reason}
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
                onBlur={handleBlur}
                isInvalid={touched.confirmEmergency && !!errors.confirmEmergency}
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