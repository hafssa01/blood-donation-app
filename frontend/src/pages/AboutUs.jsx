import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'; // Import Animate.css for animations
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <NavigationBar />
      <Container className="my-5">
        <h1 className="text-center mb-5">About Us</h1>
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card
              className="shadow-sm border-2 rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate__animated animate__fadeIn"
              style={{ transition: 'all 0.3s ease', height: '100%', borderColor: '#E9EAEC' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9EAEC';
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
              }}
            >
              <Card.Body className="text-center d-flex flex-column justify-content-center" style={{ height: '100%' }}>
                <Card.Title className="text-2xl font-bold mb-4">Hafssa Lozzi</Card.Title>
                <Card.Text className="mb-6 text-gray-700">
                  Hafssa Lozzi from Casablanca, Morocco, an ALX Software Engineering student, full-stack developer, and tech enthusiast. Driven by a passion for technology, I aim to build meaningful tools that simplify life and tackle everyday challenges.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card
              className="shadow-sm border-2 rounded-2xl transition-transform duration-300 hover:-translate-y-2 animate__animated animate__fadeIn"
              style={{ transition: 'all 0.3s ease', height: '100%', borderColor: '#E9EAEC' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E9EAEC';
                e.currentTarget.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
              }}
            >
              <Card.Body className="text-center d-flex flex-column justify-content-center" style={{ height: '100%' }}>
                <Card.Title className="text-2xl font-bold mb-4">Chaimaa Boustane</Card.Title>
                <Card.Text className="mb-6 text-gray-700">
                  Chaimaa Boustane from Marrakech, Morocco, an ALX Software Engineering student, passionate about full-stack development and tech innovation. With a love for solving real-world problems, I focus on creating simple, impactful solutions that make a difference.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="display-4">Our Vision</h2>
            <div className="underline mx-auto mb-4" style={{ width: '50px', height: '4px', backgroundColor: '#ff2c2c' }}></div>
            <p className="text-lg text-gray-700">
              Our goal is to bridge the gap between blood donors and those in need, helping save lives while addressing the challenges and high costs associated with blood donation.
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="display-4">How It Works</h2>
            <div className="underline mx-auto mb-4" style={{ width: '50px', height: '4px', backgroundColor: '#ff2c2c' }}></div>
            <p className="text-lg text-gray-700">
              This app eliminates the distance between blood donors and recipients by connecting them based on their location and blood type. Signing up is easy—just fill out a simple form to access a curated list with all the information you need. Join us and become part of Blood Connect!
            </p>
          </Col>
        </Row>
        <Row className="mb-5"></Row> {/* Added extra margin-bottom */}
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;