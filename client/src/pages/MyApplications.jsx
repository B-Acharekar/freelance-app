import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMyApplications } from "../services/applicationService";
import {
  Container,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import ApplicationCard from "../components/ApplicationCard";
import UniversalAlert from "../components/UniversalAlert";

export default function MyApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchApps = async () => {
      try {
        const res = await fetchMyApplications(token);
        setApplications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [token]);

  const handleDelete = (deletedId) => {
    setApplications((prev) => prev.filter((app) => app._id !== deletedId));
  };


  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">My Applications</h2>
        <p className="text-muted fs-5">
          Track and manage the projects you've applied to.
        </p>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <UniversalAlert
        variant="error"
        show={showError}
        onClose={() => setShowError(false)}
      >
        {error}
      </UniversalAlert>

      {!loading && !error && applications.length === 0 && (
        <UniversalAlert variant="info" show={true}>
          You haven’t applied to any projects yet.
        </UniversalAlert>
      )}

      <Row className="g-4">
        {applications.map((app) => (
          <Col key={app._id} xs={12} sm={6} lg={4}>
            <ApplicationCard app={app} onDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
