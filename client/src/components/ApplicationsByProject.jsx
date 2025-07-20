import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchApplicationsByProject,
  updateApplicationStatus,
} from "../services/applicationService";
import ApplicationReviewCard from "../components/ApplicationReviewCard";
import UniversalAlert from "../components/UniversalAlert";

import {
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { FaClipboardList } from "react-icons/fa";

const ApplicationsByProject = () => {
  const { token, user } = useAuth();
  const { projectId } = useParams();

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
      setVariant("error");
      setMessage(err.response?.data?.message || `Failed to ${decision} application.`);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <Container className="mt-5">
        <UniversalAlert variant="error" show={true}>
          Access Denied – Only clients can view applications.
        </UniversalAlert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
          <FaClipboardList /> Applications for This Project
        </h2>
        <p className="text-muted">Review and manage incoming proposals</p>
      </div>

      <UniversalAlert
        variant={variant}
        show={!!message}
        onClose={() => setMessage("")}
      >
        {message}
      </UniversalAlert>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <UniversalAlert variant="error" show={true}>
          {error}
        </UniversalAlert>
      ) : applications.length === 0 ? (
        <UniversalAlert variant="info" show={true}>
          No applications found for this project.
        </UniversalAlert>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {applications.map((app) => (
            <Col key={app._id}>
              <ApplicationReviewCard
                app={app}
                onDecision={handleDecision}
                currentUserRole={user.role}
                currentUserId={user._id}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ApplicationsByProject;
