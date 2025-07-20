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
        pt: 5,
        pb: 4,
        mt: "auto",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
      }}
    >
      <Container>
        <Row className="mb-5">
          <Col md={4} className="mb-4 mb-md-0">
            <Typography
              variant="h5"
              component="h5"
              fontWeight="bold"
              mb={2}
              sx={{ color: "white" }}
            >
              SB Works
            </Typography>
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.85)"
              sx={{ fontSize: "0.875rem" }}
            >
              A modern freelancing hub connecting top clients with skilled
              professionals worldwide.
            </Typography>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ borderBottom: "2px solid rgba(255,255,255,0.3)", pb: 1 }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {quickLinks.map(({ to, text }, idx) => (
                <Link
                  component={RouterLink}
                  to={to}
                  key={idx}
                  underline="none"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#fff",
                    },
                    fontSize: "0.9rem",
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Col>

          <Col md={4}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={2}
              sx={{ borderBottom: "2px solid rgba(255,255,255,0.3)", pb: 1 }}
            >
              Connect
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              {socialLinks.map(({ href, icon }, idx) => (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.75rem",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      color: "#fff",
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  {icon}
                </Link>
              ))}
            </Box>
          </Col>
        </Row>

        <hr
          style={{
            borderColor: "rgba(255,255,255,0.3)",
          }}
        />

        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", mt: 2 }}
        >
          &copy; {new Date().getFullYear()} SB Works. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
