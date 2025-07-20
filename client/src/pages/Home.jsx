import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-hero d-flex align-items-center justify-content-center text-center position-relative">
      <div className="hero-bg"></div>
      <div className="hero-overlay position-absolute w-100 h-100 rounded-0"></div>

      <Container className="position-relative z-3 text-white py-5">
        <h1
          className="display-2 fw-bold mb-4 aos-init aos-animate"
          data-aos="fade-down"
        >
          Welcome to <span className="gradient-text">SB Works</span>
        </h1>

        <p
          className="lead fs-4 fw-light mb-5 aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Your all-in-one freelancing workspace. Post, apply, and collaborate seamlessly.
        </p>

        <Link to="/register" className="text-decoration-none">
          <Button
            size="lg"
            className="btn-gradient px-5 py-3 fw-semibold shadow-lg rounded-pill border-0 d-inline-flex align-items-center gap-2"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <FaRocket />
            Get Started
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
