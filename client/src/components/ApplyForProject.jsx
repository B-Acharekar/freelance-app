import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { applyForProject } from "../services/applicationService";
import { fetchProjectById } from "../services/projectService";
import { getUserProfileById } from "../services/userService";
import { showToast } from "../components/toast";
import PortfolioUploader from "../components/PortfolioUploader";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Badge,
} from "react-bootstrap";
import {
  FaRupeeSign,
  FaGlobe,
  FaFileUpload,
  FaFileAlt,
  FaUserCircle,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";

const ApplyForProject = () => {
  const { user, token } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState(null);
  const [formData, setFormData] = useState({
    coverLetter: "",
    bidAmount: "",
    portfolioLink: "",
    portfolioFileUrl: "",
  });

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await fetchProjectById(projectId);
        if (!data) {
          showToast("error", "Project not found.");
          return;
        }

        setProject(data);
        setClientId(data.clientId?._id || null);

        if (data.clientId?.name) {
          setClientName(data.clientId.name);
        } else if (data.clientId?._id) {
          const client = await getUserProfileById(data.clientId._id, token);
          if (client?.name) setClientName(client.name);
        }
      } catch (err) {
        showToast("error", "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioUpload = (url) => {
    setFormData((prev) => ({ ...prev, portfolioFileUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.portfolioFileUrl) {
      showToast("warning", "Please upload a portfolio file before submitting.");
      return;
    }

    try {
      const res = await applyForProject(
        projectId,
        {
          ...formData,
          portfolioFile: formData.portfolioFileUrl,
        },
        token
      );

      if (res.status === 201) {
        showToast("success", "Application submitted successfully!");
        setFormData({
          coverLetter: "",
          bidAmount: "",
          portfolioLink: "",
          portfolioFileUrl: "",
        });
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    } catch (error) {
      showToast("error", "Failed to submit application. Try again.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col lg={7}>
          <Card className="p-4 shadow-sm rounded-4 border-0 bg-white">
            <h4 className="mb-4 text-center text-primary fw-semibold">
              Apply for this Project
            </h4>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaFileAlt className="text-muted" />
                  Cover Letter
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                  placeholder="Briefly describe your experience and suitability for this project"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaRupeeSign className="text-muted" />
                  Bid Amount (₹)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="bidAmount"
                  value={formData.bidAmount}
                  onChange={handleChange}
                  required
                  placeholder="Enter your bid amount"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaGlobe className="text-muted" />
                  Portfolio Website
                </Form.Label>
                <Form.Control
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaFileUpload className="text-muted" />
                  Upload Portfolio File
                </Form.Label>
                <PortfolioUploader onUpload={handlePortfolioUpload} />
                {formData.portfolioFileUrl && (
                  <div className="text-success mt-2 small">
                    Uploaded:&nbsp;
                    <a
                      href={formData.portfolioFileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View file
                    </a>
                  </div>
                )}
              </Form.Group>

              <div className="text-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4 py-2 rounded-pill"
                >
                  Submit Application
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <div style={{ position: "sticky", top: "100px", zIndex: 1 }}>
            <Card className="p-4 shadow-sm rounded-4 bg-white border-0">
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : project ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-dark mb-0">Project Details</h5>
                  </div>

                  <h6 className="fw-semibold text-primary mb-2">{project.title}</h6>

                  <p className="text-muted mb-2">
                    <strong>Budget:</strong> ₹{project.budget}
                  </p>

                  {project.tags?.length > 0 && (
                    <div className="mb-3">
                      {project.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          bg="light"
                          text="dark"
                          className="border me-2 mb-2 rounded-pill px-3 py-1 text-uppercase small"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                    {project.description}
                  </p>

                  <hr className="my-4" />

                  <div className="d-flex align-items-center mb-3">
                    <FaUserCircle className="text-primary me-2" size={24} />
                    <div>
                      <div className="fw-semibold text-dark">Client</div>
                      <div className="text-muted small">{clientName || "N/A"}</div>
                    </div>
                  </div>

                  {clientId && (
                    <NavLink
                      to={`/projects/${project._id}/message/${clientId}`}
                      className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaComments /> Message Client
                    </NavLink>
                  )}
                </>
              ) : null}
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplyForProject;
