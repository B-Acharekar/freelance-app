import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchApplicationsByProject,
  updateApplicationStatus,
} from "../services/applicationService";
import ApplicationReviewCard from "../components/ApplicationReviewCard";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

const ApplicationsByProject = () => {
  const { token, user } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  useEffect(() => {
    if (!token || !projectId) return;

    const fetchData = async () => {
      try {
        const res = await fetchApplicationsByProject(projectId, token);
        setApplications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, projectId]);

  const handleDecision = async (applicationId, decision) => {
    try {
      const res = await updateApplicationStatus(applicationId, decision, token);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: decision } : app
        )
      );
      setVariant("success");
      setMessage(`Application ${decision}ed successfully.`);
    } catch (err) {
      setVariant("danger");
      setMessage(err.response?.data?.message || `Failed to ${decision} application.`);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <Alert variant="danger" className="text-center mt-5">
        Access Denied – Only clients can view applications.
      </Alert>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center text-primary">Applications for This Project</h2>

      {message && (
        <Alert variant={variant} onClose={() => setMessage("")} dismissible>
          {message}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : applications.length === 0 ? (
        <Alert variant="info">No applications found for this project.</Alert>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {applications.map((app) => (
            <Col key={app._id}>
              <ApplicationReviewCard
                app={app}
                onDecision={handleDecision}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ApplicationsByProject;
