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
    emailOrUsername: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.emailOrUsername.trim() || !form.password.trim()) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser(form);
      login(res.data.user.name, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
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
              “Where passion meets opportunity.”
            </blockquote>
          </div>
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-5 bg-light"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          {loading && <ProgressBar animated now={100} className="w-100 mb-3" />}

          <h2
            className="mb-4 fw-semibold text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Login
          </h2>

          {/* Role toggle */}
          <ButtonGroup className="mb-4 w-100 justify-content-center">
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
                style={{ minWidth: "120px" }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </ToggleButton>
            ))}
          </ButtonGroup>

          <Form
            onSubmit={handleSubmit}
            noValidate
            style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
          >
            <Form.Group className="mb-3" controlId="emailOrUsername">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email or username"
                value={form.emailOrUsername}
                onChange={(e) =>
                  setForm({ ...form, emailOrUsername: e.target.value })
                }
                isInvalid={!!error && !form.emailOrUsername.trim()}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your email or username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  isInvalid={!!error && !form.password.trim()}
                  required
                />
                <InputGroup.Text
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {error && (
              <div className="text-danger mb-3" style={{ userSelect: "none" }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
