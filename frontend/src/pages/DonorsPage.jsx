import React, { useState, useEffect } from "react";
import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DonorsPage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bloodGroup, setBloodGroup] = useState(""); // For blood group filtering
  const [location, setLocation] = useState(""); // For manual location input

  const navigate = useNavigate();

  const fetchDonors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/list`, {
        params: { user_type: "donor", bloodGroup: bloodGroup || null, location: location || null },
      });
      setDonors(response.data);
    } catch (err) {
      setError("Error fetching donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, location]); // Refetch when bloodGroup or location changes

  return (
  <>
  <NavigationBar />
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Donors List</h1>
        </Col>
      </Row>
      <Form className="mb-4">
        <Form.Group controlId="bloodGroupSelect" className="mb-3">
          <Form.Label>Filter by Blood Group</Form.Label>
          <Form.Control
            as="select"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="locationInput">
          <Form.Label>Filter by Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
      </Form>

      {loading && <p>Loading donors...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {donors.map((donor) => (
          <Col md={4} key={donor.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{donor.fullName}</Card.Title>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Blood Group:</strong> {donor.bloodGroup}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Location:</strong> {donor.location}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {donor.phoneNumber}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
      <Button
        variant="danger"
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "20px"}}
      >
        Back to Dashboard
      </Button>
      </div>
    </Container>
    < Footer/>
  </>
  );
};

export default DonorsPage;
