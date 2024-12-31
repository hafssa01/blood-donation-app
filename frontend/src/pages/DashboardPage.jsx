import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [donor, setDonor] = useState(null); // Single donor
  const [recipient, setRecipient] = useState(null); // Single recipient
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const fetchDonor = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/list", {
        params: { user_type: "donor" },
      });
      setDonor(response.data[0]); // Fetch one donor
    } catch (err) {
      setError("Error fetching donor");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipient = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/list", {
        params: { user_type: "recipient" },
      });
      setRecipient(response.data[0]); // Fetch one recipient
    } catch (err) {
      setError("Error fetching recipient");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonor();
    fetchRecipient();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>

      <Container className="flex-grow-1 py-4 mt-2">
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Card className="text-center border-0">
              <Card.Body>
                <Card.Title className="display-6 fw-normal">Welcome to Your Dashboard</Card.Title>
                <Card.Text className="fs-6">Manage your blood donations and requests here.</Card.Text>
                <Button
                  href="/profile"
                  variant="primary"
                  style={{
                    borderRadius: "80px",
                    backgroundColor: "#2c2f33",
                    color: "white",
                    border: "none",
                  }}
                >
                  Go to Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Blood Donations</Card.Title>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {donor && (
                  <ListGroup>
                    <ListGroup.Item key={donor.id}>
                      <strong>Donor:</strong> {donor.fullName} <br />
                      <strong>Blood Group:</strong> {donor.bloodGroup} <br />
                      <strong>Location:</strong> {donor.location} <br />
                      <strong>Phone Number:</strong> {donor.phoneNumber}
                    </ListGroup.Item>
                  </ListGroup>
                )}
                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/donors")}
                  className="w-100 mt-3"
                  style={{
                    borderRadius: "80px",
                    border: "1px solid #ff2c2c",
                    color: "#ff2c2c",
                    backgroundColor: "white",
                  }}
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Blood Requests</Card.Title>
                {loading && <p>Loading...</p>}
                {error && <p className="text-danger">{error}</p>}
                {recipient && (
                  <ListGroup>
                    <ListGroup.Item key={recipient.id}>
                      <strong>Requester:</strong> {recipient.fullName} <br />
                      <strong>Blood Group:</strong> {recipient.bloodGroup} <br />
                      {/* <strong>Reason:</strong> {recipient.reason} <br /> */}
                      <strong>Location:</strong> {recipient.location} <br />
                      <strong>Phone Number:</strong> {recipient.phoneNumber}
                    </ListGroup.Item>
                  </ListGroup>
                )}
                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/requesters")}
                  className="w-100 mt-3"
                  style={{
                    borderRadius: "80px",
                    color: "white",
                    backgroundColor: "#ff2c2c",
                  }}
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default Dashboard;
