import React, { useState, useEffect } from "react";
import { Form, Button, Toast, ToastContainer, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar";
import Footer from "./Footer";

const DonateBloodForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    sex: "",
    weight: "",
    bloodGroup: "",
    country: "",
    city: "",
    medicalIssues: "",
    confirmSick: false,
    confirmBlood: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length === 0 && formData.confirmSick && formData.confirmBlood) {
      setToastMessage("Blood donation details submitted successfully!");
      setShowToast(true);
      setTimeout(() => navigate("/thankyou"), 3000);
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

    if (!data.weight) {
      newErrors.weight = "Weight is required.";
    } else if (parseInt(data.weight) < 50) {
      newErrors.weight = "Weight must be at least 50kg.";
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

    if (data.medicalIssues && data.medicalIssues.length > 100) {
      newErrors.medicalIssues = "Medical issues description should not exceed 100 characters.";
    }

    // Checkboxes validation
    if (!data.confirmSick) {
      newErrors.confirmSick = "Please confirm that you are not sick.";
    }

    if (!data.confirmBlood) {
      newErrors.confirmBlood = "Please confirm that you haven't given blood in the last 3 months.";
    }

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
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.weight && !!errors.weight}
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
              <Form.Label>Medical Issues (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="medicalIssues"
                value={formData.medicalIssues}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Text className="text-danger">{errors.medicalIssues}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="confirmSick"
                label="I confirm that I am not sick."
                checked={formData.confirmSick}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmSick && !!errors.confirmSick}
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
                onBlur={handleBlur}
                isInvalid={touched.confirmBlood && !!errors.confirmBlood}
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
