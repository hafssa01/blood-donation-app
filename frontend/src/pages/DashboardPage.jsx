import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState("donations");
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  const fetchDonations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/list", {
        params: { user_type: "donor" },
      });
      setDonations(response.data);
    } catch (err) {
      setError("Error fetching donations");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/list", {
        params: { user_type: "recipient" },
      });
      setRequests(response.data);
    } catch (err) {
      setError("Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "donations") {
      fetchDonations();
    } else if (activeTab === "requests") {
      fetchRequests();
    }
  }, [activeTab]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>

      <div>
        <Container className="flex-grow-1 py-4 mt-2">
          <Row className="justify-content-center mb-4">
            <Col md={6}>
              <Card className="text-center border-0">
                <Card.Body>
                  <Card.Title>Welcome to Your Dashboard</Card.Title>
                  <Card.Text>Manage your blood donations and requests here.</Card.Text>
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
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setActiveTab("donations");
                      fetchDonations(); // Fetch donations when clicked
                    }}
                    className="w-100 mb-3"
                    style={{
                      borderRadius: "80px",
                      border: "1px solid #ff2c2c",
                      color: "#ff2c2c",
                      backgroundColor: "white",
                    }}
                  >
                    View Blood Donations
                  </Button>
                  {loading && <p>Loading donations...</p>}
                  {error && <p className="text-danger">{error}</p>}
                  {activeTab === "donations" && (
                    <ListGroup>
                      {donations.map((donation) => (
                        <ListGroup.Item key={donation.id}>
                          <strong>Donor:</strong> {donation.fullName} <br/> <strong>Blood Group:</strong> {donation.bloodGroup} <br/><strong>Location:</strong> {donation.location} <br/><strong>Phone Number:</strong> {donation.phoneNumber}
                        </ListGroup.Item>
                                           ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Blood Requests</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setActiveTab("requests");
                      fetchRequests(); // Fetch requests when clicked
                    }}
                    className="w-100 mb-3"
                    style={{
                      borderRadius: "80px",
                      backgroundColor: "#ff2c2c",
                      color: "white",
                    }}
                  >
                    View Blood Requests
                  </Button>
                  {loading && <p>Loading requests...</p>}
                  {error && <p className="text-danger">{error}</p>}
                  {activeTab === "requests" && (
                    <ListGroup>
                      {requests.map((request) => (
                        <ListGroup.Item key={request.id}>
                          <strong>Requester:</strong> {request.fullName} <br/> <strong>Blood Group:</strong> {request.bloodGroup} <br/><strong>Reason:</strong> {request.reason} <br/><strong>Location:</strong> {request.location} <br/><strong>Phone Number:</strong> {request.phoneNumber}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;