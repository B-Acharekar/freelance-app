import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUserCircle, FaPlus, FaSignOutAlt,
  FaSignInAlt, FaTasks, FaThLarge, FaProjectDiagram, FaComments
} from 'react-icons/fa';

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(!showChat);

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        className="border-bottom shadow-sm"
        style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-4 text-white d-flex align-items-center"
          >
            <FaThLarge className="me-2" /> SB Works
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="bg-white border-0" />

          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="align-items-center gap-3">
              {user?.role === 'client' && (
                <>
                  <Nav.Link as={NavLink} to="/projects/post" className="text-white d-flex align-items-center gap-1">
                    <FaPlus /> Post Project
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/my-projects" className="text-white d-flex align-items-center gap-1">
                    <FaProjectDiagram /> My Projects
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/projects/browse" className="text-white d-flex align-items-center gap-1">
                    <FaTasks /> Browse Projects
                  </Nav.Link>
                </>
              )}

              {user?.role === 'freelancer' && (
                <>
                  <Nav.Link as={NavLink} to="/projects/browse" className="text-white d-flex align-items-center gap-1">
                    <FaTasks /> Browse Projects
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/applications/my" className="text-white d-flex align-items-center gap-1">
                    <FaUserCircle /> My Applications
                  </Nav.Link>
                </>
              )}

              {user && (
                <Nav.Link onClick={toggleChat} className="text-white d-flex align-items-center gap-1" style={{ cursor: 'pointer' }}>
                  <FaComments /> Chat
                </Nav.Link>
              )}

              {!user ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="d-flex align-items-center gap-2 shadow-sm fw-semibold"
                    >
                      <FaSignInAlt /> Login
                    </Button>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="d-flex align-items-center gap-2 shadow-sm fw-semibold"
                    >
                      Register
                    </Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/dashboard" className="text-white fw-semibold">
                    Dashboard
                  </Nav.Link>
                  <Button
                    variant="light"
                    size="sm"
                    className="d-flex align-items-center gap-2 shadow-sm fw-semibold text-danger bg-white"
                    onClick={logout}
                  >
                    <FaSignOutAlt /> Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Chat Sidebar / Offcanvas */}
      <Offcanvas show={showChat} onHide={toggleChat} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Replace this with your actual Chat component later */}
          <div className="d-flex flex-column" style={{ height: '80vh' }}>
            <div className="flex-grow-1 overflow-auto border p-2 mb-2 rounded bg-light">
              <p><strong>User A:</strong> Hi there!</p>
              <p><strong>User B:</strong> Hello!</p>
            </div>
            <div className="d-flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="form-control me-2"
              />
              <Button variant="primary">Send</Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
