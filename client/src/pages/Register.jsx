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
    phone: "",
    password: "",
    role: "client",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Panel */}
        <Col
          md={6}
          className="d-flex flex-column p-5"
          style={{
            background: "linear-gradient(135deg, #2196f3, #21cbf3)",
            color: "#fff",
            position: "relative",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {/* SB Works top-left */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              fontWeight: "700",
              fontSize: "1.8rem",
              color: "#eceff1",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: "none",
            }}
          >
            SB Works
          </div>

          {/* Centered quote */}
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <blockquote
              className="text-center"
              style={{
                fontSize: "2.5rem",
                fontStyle: "italic",
                fontWeight: "600",
                lineHeight: "1.3",
                maxWidth: "500px",
                userSelect: "none",
              }}
            >
              “Do what you love, and you’ll never work a day in your life.”
            </blockquote>
          </div>
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center p-5 bg-light"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <h2 className="mb-4 fw-semibold text-center">Create an Account</h2>

            {/* Role Switch */}
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
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Create an Account
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
