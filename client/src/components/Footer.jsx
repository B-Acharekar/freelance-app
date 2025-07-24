import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Typography, Link, Box } from "@mui/material";

const Footer = () => {
  const quickLinks = [
    { to: "/", text: "Home" },
    { to: "/projects/browse", text: "Browse Projects" },
    { to: "/register", text: "Register" },
    { to: "/login", text: "Login" },
  ];

  const socialLinks = [
    { href: "https://github.com", icon: <FaGithub /> },
    { href: "https://linkedin.com", icon: <FaLinkedin /> },
    { href: "mailto:contact@sbworks.com", icon: <FaEnvelope /> },
  ];

  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 5,
        mt: "auto",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Container>
        <Row className="mb-4">
          {/* Left Column: Brand */}
          <Col md={4} className="mb-4 mb-md-0">
            <Typography variant="h5" fontWeight="bold" mb={2}>
              SB Works
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              A modern freelancing hub connecting top clients with skilled professionals worldwide.
            </Typography>
          </Col>

          {/* Center Column: Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ borderBottom: "2px solid rgba(255,255,255,0.2)", pb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {quickLinks.map(({ to, text }, idx) => (
                <Link
                  key={idx}
                  component={RouterLink}
                  to={to}
                  underline="none"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    letterSpacing: 0.3,
                    transition: "color 0.25s",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Col>

          {/* Right Column: Social */}
          <Col md={4}>
            <Typography variant="subtitle1" fontWeight={600} mb={2} sx={{ borderBottom: "2px solid rgba(255,255,255,0.2)", pb: 1 }}>
              Connect
            </Typography>
            <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
              {socialLinks.map(({ href, icon }, idx) => (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1.8rem",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                      transform: "scale(1.25)",
                    },
                  }}
                >
                  {icon}
                </Link>
              ))}
            </Box>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
            mt: 3,
            letterSpacing: 0.5,
          }}
        >
          &copy; {new Date().getFullYear()} SB Works. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
