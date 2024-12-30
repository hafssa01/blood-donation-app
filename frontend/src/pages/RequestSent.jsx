import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import { Spinner, Button } from "react-bootstrap";
import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer";

const RequestSent = () => {
  return (
    <>
      <NavigationBar />
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh", color: "#ff2c2c" }}>
        <FaHeart size={100} />
        <h2 className="mt-3" style={{ color: "#666" }}>Don't worry, your blood request has been shared!</h2>
        <Spinner animation="border" role="status" style={{ color: "#ff2c2c" }} className="mt-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div className="mt-4 d-flex align-items-center" style={{ fontSize: "1.2rem" }}>
          <Button
            as={Link}
            to="/donors-list"
            variant="light"
            className="d-flex align-items-center"
            style={{ color: "#333", textDecoration: "none", borderRadius: "60px", backgroundColor: "#f7f7f7" }}
          >
            <FaArrowRight style={{ color: "#ff2c2c" }} className="me-2" />
            View Blood Donations List
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestSent;