import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, ListGroup, Form } from 'react-bootstrap';

const Filter = () => {
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleFilter = async () => {
    const payload = {
      blood_type: bloodType,
      location,
      user_type: userType,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setResults(data);
      setError(""); // Clear error if fetch succeeds
    } catch (err) {
      console.error("Error fetching filtered users:", err);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  return (
    <Container className="my-4">
      {/* <h2 className="mb-4 text-center">Filter Users</h2> */}
      <Container className="d-flex justify-content-center align-items-center">
      <Row className="align-items-end g-3">
        <Col md={3}>
          <Form.Group controlId="formBloodType">
            {/* <Form.Label>Blood Type</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter blood type"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="formLocation">
            {/* <Form.Label>Location</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="formUserType">
            {/* <Form.Label>User Type</Form.Label> */}
            <Form.Control
              as="select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Button
            variant="primary"
            onClick={handleFilter}
            disabled={!bloodType && !location && !userType}
          >
            Apply Filters
          </Button>
        </Col>
      </Row>
      </Container>
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

      {/* <h3 className="mt-4 text-center">Results:</h3> */}
      {results.length > 0 ? (
        <ListGroup className="mt-4 d-flex justify-content-center align-items-center">
          {results.map((user, index) => (
            <ListGroup.Item key={index}>
              <strong>Email:</strong> {user.email}<br />
              <strong>User Type:</strong> {user.user_type}<br />
              <strong>Blood Type:</strong> {user.blood_type}<br />
              <strong>Location:</strong> {user.location}<br />
              <strong>Phone Number:</strong> {user.phone_number || "No phone number"}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="mt-2 text-center">No results found.</p>
      )}
    </Container>
  );
  
};

export default Filter;
