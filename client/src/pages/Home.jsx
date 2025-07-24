import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRocket, FaBriefcase, FaUsers, FaComments } from 'react-icons/fa';
import '../styles/Home.css';
import HeroIllustration from '../assets/images/Hero-Illustration.svg'

const features = [
  {
    icon: <FaBriefcase size={32} className="text-primary mb-2" />,
    title: 'Post Freelance Projects',
    desc: 'Clients can easily publish tasks with budgets and timelines.',
  },
  {
    icon: <FaUsers size={32} className="text-success mb-2" />,
    title: 'Freelancer Bidding',
    desc: 'Apply with custom bids, portfolios, and delivery estimates.',
  },
  {
    icon: <FaComments size={32} className="text-info mb-2" />,
    title: 'Built-in Messaging',
    desc: 'Communicate and collaborate with real-time project updates.',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Fullscreen */}
      <section className="hero-section d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-5 mb-md-0">
              <h1 className="display-3 fw-bold gradient-text mb-4">
                Welcome to SB Works
              </h1>
              <p className="lead text-muted mb-4">
                A complete freelancing workspace to hire, apply, and manage with ease.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="btn-gradient px-4 py-2 rounded-pill fw-semibold"
                >
                  <FaRocket className="me-2" />
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col md={6} className="text-center">
              <img
                src={HeroIllustration}
                alt="Freelancing workspace illustration"
                className="img-fluid hero-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Fullscreen */}
      <section className="features-section d-flex align-items-center">
        <Container>
          <h2 className="text-center fw-bold mb-5 display-5">
            What You Can Do
          </h2>
          <Row className="g-4 justify-content-center">
            {features.map((f, i) => (
              <Col key={i} md={4} sm={6}>
                <div className="feature-card text-center p-4 shadow-sm rounded-4 bg-white h-100">
                  {f.icon}
                  <h5 className="fw-semibold mt-2">{f.title}</h5>
                  <p className="text-muted fs-5">{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
