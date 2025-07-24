import { useEffect, useState, useCallback } from "react";
import {
  Container,
  Spinner,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { fetchMyApplications } from "../services/applicationService";
import ApplicationCard from "../components/ApplicationCard";
import UniversalAlert from "../components/UniversalAlert";
import { FaSearch, FaFolderOpen } from "react-icons/fa";

export default function MyApplications() {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchApps = async () => {
      try {
        const res = await fetchMyApplications(token);
        setApplications(res.data);
        setFilteredApps(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [token]);

  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const performSearch = useCallback(
    debounce((term) => {
      const lower = term.toLowerCase();
      if (!lower) {
        setFilteredApps(applications);
        return;
      }

      const filtered = applications.filter((app) => {
        const { projectTitle, projectDescription, coverLetter, skills = [] } = app;
        const combined = `${projectTitle} ${projectDescription} ${coverLetter} ${skills.join(" ")}`.toLowerCase();
        return combined.includes(lower);
      });

      setFilteredApps(filtered);
    }, 300),
    [applications]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredApps(applications);
  };

  const handleDelete = (deletedId) => {
    const updated = applications.filter((app) => app._id !== deletedId);
    setApplications(updated);
    setFilteredApps(updated);
  };

  return (
    <Container className="my-5" style={{ maxWidth: "1140px" }}>
      <h2 className="mb-4 fw-bold text-center text-primary">My Applications</h2>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search applications by title, description, or skills..."
            value={searchTerm}
            onChange={handleInputChange}
            className="rounded-pill ps-4 pe-5 border-0 shadow-sm bg-light"
            style={{ height: "48px" }}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              type="button"
              className="btn btn-sm bg-transparent border-0 text-muted position-absolute top-50 translate-middle-y end-0 me-5"
              aria-label="Clear search"
            >
              <span className="fs-5 fw-bold">×</span>
            </button>
          )}
          <FaSearch
            className="position-absolute top-50 translate-middle-y end-0 me-3 text-secondary opacity-75"
          />
        </Form.Group>
      </Form>

      {/* Error Alert */}
      <UniversalAlert
        variant="error"
        show={showError}
        onClose={() => setShowError(false)}
      >
        {error}
      </UniversalAlert>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-5" aria-live="polite" aria-busy="true">
          <Spinner animation="border" variant="primary" role="status" />
          <div className="mt-2 text-primary fw-semibold">Loading applications...</div>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && filteredApps.length === 0 && (
        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5">
          <FaFolderOpen size={64} className="text-muted mb-3" />
          <h5 className="fw-semibold text-muted">No applications found</h5>
          <p className="text-secondary" style={{ maxWidth: "420px" }}>
            {searchTerm
              ? "No applications match your search. Try different keywords."
              : "You haven’t applied to any projects yet."}
          </p>
        </div>
      )}

      {/* Results Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredApps.map((app) => (
          <Col key={app._id}>
            <div className="shadow-sm rounded-4 h-100 p-2 bg-white border border-light-subtle">
              <ApplicationCard app={app} onDelete={handleDelete} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
