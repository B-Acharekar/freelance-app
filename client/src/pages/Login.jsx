import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserTie,
  FaUserAstronaut,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../components/toast";
import { loginUser } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
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

      login(user, token);
      localStorage.setItem("token", token);
      showToast("success", "Login successful!")
      navigate(user.role === "admin" ? "/dashboard/admin" : "/dashboard");
    } catch (err) {
      setError("Login failed. Check your credentials.");
      showToast("error", "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center p-0 bg-white">
      <Row className="w-100 h-100 g-0">
        {/* Left Hero */}
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            position: "relative",
          }}
        >
          <div
            className="position-absolute"
            style={{
              top: "20%",
              left: "10%",
              fontSize: "5rem",
              color: "rgba(255,255,255,0.05)",
              display: "flex",
              gap: "2rem",
              zIndex: 0,
            }}
          >
            <FaUserShield />
            <FaUserTie />
            <FaUserAstronaut />
          </div>

          <div style={{ zIndex: 1, textAlign: "center", maxWidth: "500px" }}>
            <h1 className="fw-bold display-4">SB Works</h1>
            <p className="lead fs-4">
              Where <strong>passion</strong> meets <strong>opportunity</strong>.
            </p>
            <p className="fs-6 opacity-75">
              Collaborate, bid, hire — all in one place.
            </p>
          </div>
        </Col>

        {/* Right Form Section */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-light p-4"
        >
          <div
            className="shadow p-5 w-100"
            style={{
              maxWidth: "420px",
              borderRadius: "1rem",
              background: "white",
              border: "1px solid #e3f2fd",
            }}
          >
            <h3 className="text-center fw-bold mb-4" style={{ color: "#6a11cb" }}>
              Login to Your Account
            </h3>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. user@sbworks.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  isInvalid={!!error && !form.email.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    isInvalid={!!error && !form.password.trim()}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Please enter your password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              {error && (
                <div className="text-danger text-center mb-3">{error}</div>
              )}

              <Button
                type="submit"
                className="w-100 fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  border: "none",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>

            <div className="text-center mt-4 small">
              <span className="text-muted">New to SB Works?</span>{" "}
              <a
                role="button"
                onClick={() => navigate("/register")}
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
                Create an account
              </a>
            </div>

          </div>
        </Col>
      </Row>
    </Container >
  );
};

export default Login;
