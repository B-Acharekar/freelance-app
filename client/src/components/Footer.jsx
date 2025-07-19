import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="text-light pt-5 pb-4 mt-auto"
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      }}
    >
      <Container>
        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold text-white mb-3">SB Works</h5>
            <p className="text-light small">
              A modern freelancing hub connecting top clients with skilled professionals worldwide.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="fw-semibold text-white mb-3 border-bottom pb-2">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              {[
                { to: '/', text: 'Home' },
                { to: '/projects/browse', text: 'Browse Projects' },
                { to: '/register', text: 'Register' },
                { to: '/login', text: 'Login' },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to}
                  className="text-light text-decoration-none"
                  style={{ transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = '#d1e3ff')}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </Col>

          <Col md={4}>
            <h6 className="fw-semibold text-white mb-3 border-bottom pb-2">Connect</h6>
            <div className="d-flex gap-4">
              {[
                { href: 'https://github.com', icon: <FaGithub /> },
                { href: 'https://linkedin.com', icon: <FaLinkedin /> },
                { href: 'mailto:contact@sbworks.com', icon: <FaEnvelope /> },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light fs-4"
                  style={{ transition: 'transform 0.3s ease, color 0.3s ease' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#e0e0e0';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr className="border-light" />

        <p className="text-center text-white-50 small mb-0">
          &copy; {new Date().getFullYear()} SB Works. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
