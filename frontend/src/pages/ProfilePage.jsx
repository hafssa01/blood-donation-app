import React, { useState, useEffect } from "react";
import { Form, Button, Toast, ToastContainer, Card } from "react-bootstrap";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    bloodGroup: "",
    // Add other fields as necessary
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user-profile"); // Adjust the endpoint as necessary
        setUserData(response.data);
      } catch (error) {
        setToastMessage("Error fetching user data.");
        setShowToast(true);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(userData);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.put("http://localhost:5000/update-profile", userData); // Adjust the endpoint as necessary
        setToastMessage("Profile updated successfully!");
        setShowToast(true);
      } catch (error) {
        setToastMessage("Error updating profile.");
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
    // Add validation logic as necessary
    if (!data.fullName) newErrors.fullName = "Full name is required.";
    if (!data.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    return newErrors;
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3" style={{ minHeight: "100vh" }}>
      <Card className="p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              isInvalid={!!errors.fullName}
            />
            <Form.Text className="text-danger">{errors.fullName}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Blood Group</Form.Label>
            <Form.Control
              type="text"
              name="bloodGroup"
              value={userData.bloodGroup}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="w-100 mb-2">Update Profile</Button>
        </Form>
      </Card>
      <ToastContainer position="top-center" className="mt-5">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Profile;