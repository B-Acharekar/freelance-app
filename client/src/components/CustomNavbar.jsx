import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <Container fluid className="px-4">
        <Navbar.Brand
          as={Link}
          to={user ? (user.role === "admin" ? "/dashboard/admin" : "/dashboard") : "/"}
          className="fw-bold fs-4 text-white"
          style={{ letterSpacing: "0.05em" }}
        >
          SB Works
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="bg-white border-0" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3 fw-semibold">
            {/* Client Links */}
            {user?.role === "client" && (
              <>
                <Nav.Link as={NavLink} to="/projects/post" className="text-white">
                  Post Project
                </Nav.Link>
                <Nav.Link as={NavLink} to="/my-projects" className="text-white">
                  My Projects
                </Nav.Link>
                <Nav.Link as={NavLink} to="/projects/browse" className="text-white">
                  Browse Projects
                </Nav.Link>
                <Nav.Link as={NavLink} to="/chat" className="text-white">
                  Messages
                </Nav.Link>
              </>
            )}

            {/* Freelancer Links */}
            {user?.role === "freelancer" && (
              <>
                <Nav.Link as={NavLink} to="/projects/browse" className="text-white">
                  Browse Projects
                </Nav.Link>
                <Nav.Link as={NavLink} to="/applications/my" className="text-white">
                  My Applications
                </Nav.Link>
                <Nav.Link as={NavLink} to="/projects/active" className="text-white">
                  My Work
                </Nav.Link>
              </>
            )}

            {/* Auth Links */}
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill px-3 fw-semibold shadow-sm"
                  >
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="rounded-pill px-3 fw-semibold shadow-sm"
                  >
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {user.role !== "admin" && (
                  <Nav.Link as={NavLink} to="/dashboard" className="text-white">
                    Dashboard
                  </Nav.Link>
                )}
                <Button
                  onClick={logout}
                  variant="light"
                  size="sm"
                  className="rounded-pill px-3 text-danger fw-semibold shadow-sm"
                >
                  Logout
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
