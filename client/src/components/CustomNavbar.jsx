import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaTasks,
  FaThLarge,
  FaProjectDiagram,
  FaComments,
} from "react-icons/fa";

const CustomNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="border-bottom shadow-sm"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 text-white d-flex align-items-center"
          style={{ letterSpacing: "0.05em" }}
        >
          <FaThLarge className="me-2" />
          SB Works
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="bg-white border-0"
          style={{ width: "3rem", height: "3rem" }}
        />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav
            className="align-items-center gap-3"
            style={{ fontWeight: 600, letterSpacing: "0.02em" }}
          >
            {user?.role === "client" && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/projects/post"
                  className="text-white d-flex align-items-center gap-1 nav-link-hover"
                >
                  <FaPlus />
                  Post Project
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/my-projects"
                  className="text-white d-flex align-items-center gap-1 nav-link-hover"
                >
                  <FaProjectDiagram />
                  My Projects
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/projects/browse"
                  className="text-white d-flex align-items-center gap-1 nav-link-hover"
                >
                  <FaTasks />
                  Browse Projects
                </Nav.Link>
              </>
            )}

            {user?.role === "freelancer" && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/projects/browse"
                  className="text-white d-flex align-items-center gap-1 nav-link-hover"
                >
                  <FaTasks />
                  Browse Projects
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/applications/my"
                  className="text-white d-flex align-items-center gap-1 nav-link-hover"
                >
                  <FaUserCircle />
                  My Applications
                </Nav.Link>
              </>
            )}

            {user?.role === "client" && (
              <Nav.Link
                as={NavLink}
                to="/chat"
                className="text-white d-flex align-items-center gap-2 nav-link-hover"
                style={{ fontWeight: 600 }}
              >
                <FaComments />
                Messages
              </Nav.Link>
            )}

            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/login" className="d-flex align-items-center">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="d-flex align-items-center gap-2 shadow-sm fw-semibold rounded-pill px-3"
                  >
                    <FaSignInAlt /> Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="d-flex align-items-center">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="d-flex align-items-center gap-2 shadow-sm fw-semibold rounded-pill px-3"
                  >
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/dashboard"
                  className="text-white fw-semibold nav-link-hover"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  Dashboard
                </Nav.Link>
                <Button
                  variant="light"
                  size="sm"
                  className="d-flex align-items-center gap-2 shadow-sm fw-semibold text-danger bg-white rounded-pill px-3"
                  onClick={logout}
                  style={{ whiteSpace: "nowrap" }}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
