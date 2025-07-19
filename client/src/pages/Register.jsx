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
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        {/* Left Panel */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>SB Works</h1>
          <p
            className="text-center mt-4"
            style={{
              fontSize: "1.5rem",
              maxWidth: "500px",
              fontStyle: "italic",
              opacity: 0.95,
            }}
          >
            “Do what you love, and you’ll never work a day in your life.”
          </p>
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <div
            className="p-4 shadow-lg rounded-4 w-100"
            style={{
              maxWidth: "450px",
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e0e0e0",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3 className="text-center mb-4 fw-bold">Create an Account</h3>

            {/* Role toggle */}
            <Form.Group className="mb-4 text-center">
              <ButtonGroup>
                {["client", "freelancer"].map((role) => (
                  <ToggleButton
                    key={role}
                    id={`radio-${role}`}
                    type="radio"
                    variant={
                      form.role === role ? "primary" : "outline-primary"
                    }
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.currentTarget.value })
                    }
                    className="mx-2 rounded-pill px-4 fw-semibold"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="rounded-3"
                />
              </Form.Group>

              {error && (
                <div className="text-danger mb-3 text-center">{error}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-2 fw-bold rounded-3"
              >
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
