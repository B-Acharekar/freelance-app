import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { applyForProject } from "../services/applicationService";
import InfoCard from "../components/InfoCard";
import {
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function ApplyForProject({ projectId }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverLetter: "",
    bidAmount: "",
    portfolioLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setVariant("warning");
      setMessage("You must be logged in to apply.");
      return;
    }

    setLoading(true);
    try {
      const res = await applyForProject(projectId, formData, token);
      setVariant("success");
      setMessage(res.data.message || "Application submitted successfully.");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setVariant("danger");
      setMessage(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfoCard title="Apply for This Project">
      <Form onSubmit={handleSubmit} className="p-3">
        <Row>
          <Col md={12}>
            <FloatingLabel controlId="coverLetter" label="Cover Letter" className="mb-4">
              <Form.Control
                as="textarea"
                name="coverLetter"
                required
                style={{ height: "140px", resize: "none" }}
                placeholder="Describe why you're a great fit..."
                value={formData.coverLetter}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="bidAmount" label="Bid Amount ($)" className="mb-4">
              <Form.Control
                type="number"
                name="bidAmount"
                required
                placeholder="Enter your bid"
                value={formData.bidAmount}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel controlId="portfolioLink" label="Portfolio URL" className="mb-4">
              <Form.Control
                type="url"
                name="portfolioLink"
                required
                placeholder="https://yourportfolio.com"
                value={formData.portfolioLink}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <div className="d-grid">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="rounded-pill shadow-sm"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane className="me-2" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </Form>

      {message && (
        <Alert
          variant={variant}
          className="mt-4 d-flex align-items-center gap-3 px-4 py-3 rounded-4 shadow-sm"
        >
          {variant === "success" && <FaCheckCircle size={18} />}
          {variant === "danger" && <FaExclamationTriangle size={18} />}
          <span className="fs-6">{message}</span>
        </Alert>
      )}
    </InfoCard>
  );
}
