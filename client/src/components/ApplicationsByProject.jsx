import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchApplicationsByProject,
  updateApplicationStatus,
} from "../services/applicationService";
import ApplicationReviewCard from "../components/ApplicationReviewCard";
import { showToast } from "../components/toast";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import { FaClipboardList } from "react-icons/fa";

const ApplicationsByProject = () => {
  const { token, user } = useAuth();
  const { projectId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !projectId) return;

    const fetchData = async () => {
      try {
        const res = await fetchApplicationsByProject(projectId, token);
        setApplications(res.data);
        if (res.data.length === 0) {
          showToast("info", "No applications found for this project.");
        }
      } catch (err) {
        const msg =
          err.response?.data?.message || "Failed to fetch applications.";
        showToast("error", msg);
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
      showToast("success", `Application ${decision}ed successfully.`);
    } catch (err) {
      const msg =
        err.response?.data?.message || `Failed to ${decision} application.`;
      showToast("error", msg);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <strong>Access Denied:</strong> Only clients can view applications.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="text-center">
          <h3 className="fw-bold text-primary mb-2 d-flex justify-content-center align-items-center gap-2">
            <FaClipboardList /> Applications Overview
          </h3>
          <p className="text-muted mb-0">
            View and manage proposals submitted for this project
          </p>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <Alert variant="info" className="text-center rounded-4">
          No applications received for this project yet.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {applications.map((app) => (
            <Col key={app._id}>
              <ApplicationReviewCard
                app={app}
                onAccept={(id) => handleDecision(id, "accepted")}
                onReject={(id) => handleDecision(id, "rejected")}
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
