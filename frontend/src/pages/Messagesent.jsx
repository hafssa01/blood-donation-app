import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckCircle } from 'react-bootstrap-icons'; // Import the check icon from react-bootstrap-icons
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';

const Messagesent = () => {
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
      </Container>
      <Footer />
    </div>
  );
};

export default Messagesent;