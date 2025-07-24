import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "../components/toast";
import { FaUserPlus, FaUserTie, FaUserGraduate } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(form);
      showToast("success", "Registration successful!")
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      showToast("error", "Registration failed. Please check your details.");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 p-0 position-relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Floating Icons Background */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "10%",
          fontSize: "5rem",
          color: "rgba(255, 255, 255, 0.05)",
          zIndex: 0,
          display: "flex",
          gap: "2rem",
        }}
      >
        <FaUserPlus />
        <FaUserTie />
        <FaUserGraduate />
      </div>

      <Row className="h-100 g-0">
        {/* Left Panel */}
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            padding: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "700", zIndex: 1 }}>
            SB Works
          </h1>
          <p
            className="mt-3 text-center"
            style={{ fontSize: "1.5rem", zIndex: 1, maxWidth: "500px" }}
          >
            Create your profile and let the world know your skills.
          </p>
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f4f8fb" }}
        >
          <div
            className="p-5 rounded-5 shadow-lg w-100 animate__animated animate__fadeIn"
            style={{
              maxWidth: "460px",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid #e3f2fd",
              zIndex: 1,
            }}
          >
            <h2
              className="text-center mb-4"
              style={{ fontWeight: 600, color: "#6a11cb" }}
            >
              Create an Account
            </h2>

            {/* Toggle Role */}
            <ButtonGroup className="mb-4 w-100 d-flex justify-content-center">
              {["client", "freelancer"].map((role) => (
                <ToggleButton
                  key={role}
                  id={`radio-${role}`}
                  type="radio"
                  name="role"
                  value={role}
                  checked={form.role === role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.currentTarget.value })
                  }
                  className="mx-2 rounded-pill fw-semibold shadow-sm"
                  style={{
                    minWidth: "130px",
                    backgroundColor: form.role === role ? "#6a11cb" : "#fff",
                    borderColor: "#b39ddb",
                    color: form.role === role ? "#fff" : "#6a11cb",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </ToggleButton>
              ))}
            </ButtonGroup>

            {/* Form */}
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="rounded-4 shadow-sm"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="rounded-4 shadow-sm"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="fw-semibold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="rounded-4 shadow-sm"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label className="fw-semibold">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="rounded-4 shadow-sm"
                  required
                />
              </Form.Group>

              {error && (
                <div className="text-danger mb-3 text-center">{error}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 mt-2 rounded-4 fw-bold"
                style={{
                  background: "#6a11cb",
                  border: "none",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                }}
              >
                Register
              </Button>
            </Form>
            <div className="text-center mt-4 small">
              <span className="text-muted">Already have an account?</span>{" "}
              <a
                role="button"
                onClick={() => navigate("/login")}
                style={{
                  color: "#6a11cb",
                  textDecoration: "underline",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#2575fc")}
                onMouseLeave={(e) => (e.target.style.color = "#6a11cb")}
              >
                Login
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
