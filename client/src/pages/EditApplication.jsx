import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  updateMyApplication,
  fetchApplicationById,
} from "../services/applicationService";
import {
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import PortfolioUploader from "../components/PortfolioUploader";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const EditApplication = () => {
  const { projectId: id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const fetchApplication = async () => {
    try {
      const res = await fetchApplicationById(id, token);
      setAppData(res.data);
      setLoading(false);
    } catch (err) {
      alert("Failed to fetch application");
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioUpload = (url) => {
    setAppData((prev) => ({ ...prev, portfolioFile: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMyApplication(id, appData, token);
      setVariant("success");
      setMessage("Application updated successfully.");
      setTimeout(() => navigate("/applications/my"), 3000);
    } catch (err) {
      setVariant("danger");
      setMessage("Failed to update application.");
    }
  };

  if (loading)
    return (
      <Spinner animation="border" className="d-block mx-auto mt-5" />
    );

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <Card className="p-4 shadow-lg rounded-4 border-light">
            <h3 className="mb-4 text-center fw-bold text-dark">
              Edit Your Application
            </h3>

            {message && (
              <Alert variant={variant} className="d-flex align-items-center gap-2">
                {variant === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
                <span>{message}</span>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Cover Letter</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="coverLetter"
                  value={appData.coverLetter}
                  onChange={handleChange}
                  required
                  placeholder="Update your cover letter..."
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Bid Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="bidAmount"
                  value={appData.bidAmount}
                  onChange={handleChange}
                  required
                  placeholder="Update your bid"
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Portfolio Website (optional)</Form.Label>
                <Form.Control
                  type="url"
                  name="portfolioLink"
                  value={appData.portfolioLink}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="shadow-sm"
                />
              </Form.Group>

              <div className="mb-3">
                <Form.Label className="fw-semibold">Uploaded Portfolio File</Form.Label>
                {appData.portfolioFile ? (
                  <div>
                    <a
                      href={appData.portfolioFile}
                      target="_blank"
                      rel="noreferrer"
                      className="text-success"
                    >
                      View current file
                    </a>
                  </div>
                ) : (
                  <div className="text-danger">
                    You don’t have any uploaded file. Please upload one.
                  </div>
                )}
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Upload New Portfolio (PDF/Images)</Form.Label>
                <PortfolioUploader onUpload={handlePortfolioUpload} />
              </Form.Group>

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-pill fw-bold"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditApplication;
