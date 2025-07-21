import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserTie,
  FaUserAstronaut,
} from "react-icons/fa";

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
      const { user, token } = res.data;

      login(user, token); // Store user in context
      localStorage.setItem("token", token);

      // 🔁 Redirect based on user role
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 p-0 position-relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Floating Icons */}
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
        <FaUserShield />
        <FaUserTie />
        <FaUserAstronaut />
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
            Where <strong>passion</strong> meets <strong>opportunity</strong>.
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
              Login to Your Account
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
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-semibold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. user@sbworks.com"
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
                <Form.Label className="fw-semibold">Password</Form.Label>
                <InputGroup className="rounded-4 shadow-sm">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    isInvalid={!!error && !form.password.trim()}
                    className="rounded-start-4"
                  />
                  <InputGroup.Text
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#e3f2fd",
                      borderLeft: 0,
                      borderRadius: "0 12px 12px 0",
                    }}
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
                  background: "#6a11cb",
                  border: "none",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
