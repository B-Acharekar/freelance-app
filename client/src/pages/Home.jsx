import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-hero d-flex align-items-center justify-content-center text-center">
      <div className="hero-overlay position-absolute w-100 h-100"></div>

      <Container className="position-relative z-2 text-white">
        <h1 className="display-2 fw-bold mb-4">
          Welcome to <span className="gradient-text">SB Works</span>
        </h1>
        <p className="lead mb-5 fs-4 fw-light">
          Your modern freelancing hub — post, apply, and manage projects with ease.
        </p>

        <Link to="/register">
          <Button
            size="lg"
            className="btn-gradient px-5 py-3 fw-semibold shadow-lg rounded-pill border-0"
          >
            Get Started
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
