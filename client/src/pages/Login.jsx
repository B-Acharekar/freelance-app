import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    role: "client",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 overflow-hidden">
      <Row className="h-100">
        {/* Left Panel with animated quote */}
        <Col
          md={6}
          className="d-flex flex-column p-5"
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="d-flex flex-grow-1 justify-content-center align-items-center px-3">
            <blockquote
              className="text-center animate__animated animate__fadeInUp"
              style={{
                fontSize: "2.6rem",
                fontStyle: "italic",
                fontWeight: "600",
                lineHeight: "1.4",
                maxWidth: "600px",
                userSelect: "none",
                color: "#e3f2fd",
                textShadow: "1px 2px 10px rgba(0,0,0,0.3)",
                animationDelay: "0.5s",
              }}
            >
              “Where <span style={{ color: "#fff176" }}>passion</span> meets{" "}
              <span style={{ color: "#ffd54f" }}>opportunity</span>.”
            </blockquote>
          </div>
        </Col>

        {/* Right Panel with glassmorphism form */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center p-4"
          style={{
            background: "#f1f2f6",
          }}
        >
          <div
            className="glass-card p-5 rounded-5 shadow-lg w-100 animate__animated animate__fadeIn"
            style={{
              maxWidth: "450px",
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            }}
          >
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "700",
              }}
            >
              Login
            </h2>

            {/* Role toggle */}
            <ButtonGroup className="mb-4 w-100 d-flex justify-content-center">
              {["client", "freelancer"].map((role) => (
                <ToggleButton
                  key={role}
                  id={`radio-${role}`}
                  type="radio"
                  variant={form.role === role ? "primary" : "outline-primary"}
                  name="role"
                  value={role}
                  checked={form.role === role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.currentTarget.value })
                  }
                  className="mx-2 rounded-pill fw-semibold"
                  style={{
                    minWidth: "130px",
                    background:
                      form.role === role
                        ? "linear-gradient(45deg, #42a5f5, #478ed1)"
                        : "transparent",
                    borderColor: "#90caf9",
                  }}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </ToggleButton>
              ))}
            </ButtonGroup>

            {/* Form */}
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. john@workmail.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  isInvalid={!!error && !form.email.trim()}
                  className="rounded-4 shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup className="rounded-4 shadow-sm">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    isInvalid={!!error && !form.password.trim()}
                    className="rounded-start-4"
                  />
                  <InputGroup.Text
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f5f5f5",
                      borderLeft: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
              </Form.Group>

              {error && (
                <div className="text-danger mb-3 text-center">{error}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100 py-2 mt-2 rounded-4 fw-bold"
                style={{
                  background:
                    "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                  border: "none",
                }}
                disabled={loading}
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
