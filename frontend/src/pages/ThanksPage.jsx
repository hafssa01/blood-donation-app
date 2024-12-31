import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

const ThankYou = () => {
  return (
    <>
      <NavigationBar />
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#fff' }}>
        <h1 style={{ color: '#ff2c2c', fontSize: '4rem', fontWeight: 'bold' }}>
          Thank You
        </h1>
        <HeartFill color="#ff2c2c" size={50} />
        <p style={{ color: '#000', fontSize: '1.5rem' }}>
          Your blood donation can save lives.
        </p>
        <div className="mt-4 d-flex align-items-center" style={{ fontSize: "1.2rem" }}>
          <Button
            as={Link}
            to="/requesters"
            variant="light"
            className="d-flex align-items-center"
            style={{ color: "#333", textDecoration: "none", borderRadius: "60px", backgroundColor: "#f7f7f7" }}
          >
            <FaArrowRight style={{ color: "#ff2c2c" }} className="me-2" />
            View Blood Requests List
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;