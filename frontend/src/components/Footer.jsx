import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3 mt-5" style={{ width: '100vw' }}>
      <div className="text-center">
        <p className="mb-1">&copy; {currentYear} BloodConnect by Chaimaa and Hafssa</p>
        <p className="mb-0" style={{ fontSize: '14px' }}>
          "Blood donation is a gift of life for you and me."
        </p>
        <div className="mt-2">
          <a href="/privacy-policy" className="text-decoration-none text-white mx-2">
            Privacy Policy
          </a>
          |
          <a href="/terms-of-service" className="text-decoration-none text-white mx-2">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;