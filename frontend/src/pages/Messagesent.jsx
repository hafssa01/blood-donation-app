import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckCircle } from 'react-bootstrap-icons'; // Import the check icon from react-bootstrap-icons
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Messagesent = () => {

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <Container className="d-flex flex-column align-items-center my-5 flex-grow-1">
        <h1 className="text-center mb-5">Thank You</h1>
        <Row className="w-100 justify-content-center">
          <Col md={6} className="text-center">
            <CheckCircle size={100} color="grey" className="mb-4" />
            <p>Your message has been sent.</p>
          </Col>
        </Row>
        <Button
            variant="danger"
            onClick={() => navigate("/dashboard")}
            style={{
              marginTop: "20px",
              backgroundColor: "#ff2c2c",
              borderRadius: "20px",
              color: "white",
              border: "none",
            }}
          >
            Back to Dashboard
          </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default Messagesent;