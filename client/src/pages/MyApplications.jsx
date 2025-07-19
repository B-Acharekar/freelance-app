import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchMyApplications } from "../services/applicationService";
import {
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import ApplicationCard from "../components/ApplicationCard";

export default function MyApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchApps = async () => {
      try {
        const res = await fetchMyApplications(token);
        setApplications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [token]);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">My Applications</h2>
        <p className="text-muted">
          View the status of projects you've applied to.
        </p>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && applications.length === 0 && (
        <Alert variant="info" className="text-center">
          You haven't applied to any projects yet.
        </Alert>
      )}

      <Row className="g-4">
        {applications.map((app) => (
          <Col key={app._id} xs={12} sm={6} md={4}>
            <ApplicationCard app={app} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
