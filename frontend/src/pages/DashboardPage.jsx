import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState("donations");
  const [donations] = useState([

  ]);

  const [requests] = useState([
    
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </div>

      <div>
        <Container className="flex-grow-1 py-4 mt-5">
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
                      backgroundColor: "#2c2f33",  // Light black like ChatGPT's chat zone
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
                    onClick={() => setActiveTab("donations")}
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
                  {activeTab === "donations" && (
                    <ListGroup>
                      {donations.map((donation) => (
                        <ListGroup.Item key={donation.id}>
                          <strong>Donor:</strong> {donation.donor} | <strong>Amount:</strong>{" "}
                          {donation.amount} | <strong>Date:</strong> {donation.date}
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
                    onClick={() => setActiveTab("requests")}
                    className="w-100 mb-3"
                    style={{
                      borderRadius: "80px",
                      backgroundColor: "#ff2c2c",
                      color: "white",
                    }}
                  >
                    View Blood Requests
                  </Button>
                  {activeTab === "requests" && (
                    <ListGroup>
                      {requests.map((request) => (
                        <ListGroup.Item key={request.id}>
                          <strong>Requester:</strong> {request.requester} | <strong>Amount:</strong>{" "}
                          {request.amount} | <strong>Date:</strong> {request.date}
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