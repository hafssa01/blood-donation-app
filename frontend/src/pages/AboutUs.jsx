import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import hafssaAvatar from '../assets/hafssa.jpg'; // Adjust the path if necessary
import chaimaaAvatar from '../assets/chaimaa.jpg'; // Adjust the path if necessary
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
      <NavigationBar />
      <Container className="d-flex flex-column align-items-center my-5">
        <h1 className="text-center mb-5">About Us</h1>
        <Row className="mb-5 w-100 justify-content-center fade show">
          <Col md={6} className="mb-4">
            <div className="shadow-sm bg-dark text-white p-4 text-center">
              <h2>Hafssa Lozzi</h2>
              <p>
              Hafssa Lozzi from Casablanca, Morocco, an ALX Software Engineering student, full-stack developer, and tech enthusiast. Driven by a passion for technology, I aim to build meaningful tools that simplify life and tackle everyday challenges.              </p>
              <img src={hafssaAvatar} alt="Hafssa Lozzi" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="shadow-sm bg-dark text-white p-4 text-center">
              <h2>Chaimaa Boustane</h2>
              <p>
              Chaimaa Boustane from Marrakech, Morocco, an ALX Software Engineering student, passionate about full-stack development and tech innovation. With a love for solving real-world problems, I focus on creating simple, impactful solutions that make a difference.              </p>
              <img src={chaimaaAvatar} alt="Chaimaa Boustane" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
            </div>
          </Col>
        </Row>
        <Row className="mb-5 w-100 justify-content-center fade show">
          <Col md={8} className="text-center mb-5">
            <h2 className="display-4">Our Vision</h2>
            <div className="underline mx-auto mb-4" style={{ width: '50px', height: '4px', backgroundColor: '#ff2c2c' }}></div>
            <p>
              Our goal is to bridge the gap between blood donors and those in need, helping save lives while addressing the challenges and high costs associated with blood donation.
            </p>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center fade show">
          <Col md={8} className="text-center mb-5">
            <h2 className="display-4">How It Works</h2>
            <div className="underline mx-auto mb-4" style={{ width: '50px', height: '4px', backgroundColor: '#ff2c2c' }}></div>
            <p>
              This app eliminates the distance between blood donors and recipients by connecting them based on their location and blood type. Signing up is easy—just fill out a simple form to access a curated list with all the information you need. Join us and become part of Blood Connect!
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;