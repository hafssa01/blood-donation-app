import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeartFill } from 'react-bootstrap-icons'; // Ensure you have react-bootstrap-icons installed
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';


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
      </div>
      <Footer />
    </>
  );
};

export default ThankYou;