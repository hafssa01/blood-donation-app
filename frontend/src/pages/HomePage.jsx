import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../components/NavBar';
import banner from '../assets/banner.png';
import img2 from '../assets/img2.png'
import BloodDonationProcess from '../components/BloodDonationProcess';

const HomePage = () => {
  return (
    <>
      <NavigationBar />

      <div className="container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12 mb-4">
            <img
              src={banner}
              alt="Banner"
              className="img-fluid"
              style={{ marginTop: '20px', marginBottom: '50px' }} // Increased margin below banner
            />
          </div>
        </div>

        <div className="row align-items-center my-5"> {/* Added more top/bottom margin */}
          <div className="col-md-6">
            <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>Donate blood</h1>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#6c757d" }}>
              It only takes about an hour of your time to transform someone's life.
            </h2>
            <p style={{ fontSize: "16px", color: "#495057" }}>
              Blood and blood products are essential to everyday medical care. They are used for major surgeries, medical procedures, cancer treatments, and the management of various diseases. As a donor, you play a crucial role in supporting individuals who cannot afford these vital treatments.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={img2}
              alt="Donate"
              className="img-fluid"
            />
          </div>

        </div>
        <BloodDonationProcess />
  
      </div>
    </>
  );
};

export default HomePage;