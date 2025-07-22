import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";
import UniversalAlert from "../components/UniversalAlert";
import { useAuth } from "../context/AuthContext";
import { FaFolderOpen, FaSearch } from "react-icons/fa";

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchAllProjects();
        setProjects(res.data);
        setFilteredProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Unable to load projects. Please try again later.");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter((proj) =>
      proj.title.toLowerCase().includes(term) ||
      proj.description.toLowerCase().includes(term) ||
      proj.skillsRequired.some((skill) => skill.toLowerCase().includes(term))
    );

    setFilteredProjects(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProjects(projects);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "1140px" }}>
      <h2 className="mb-4 fw-bold text-center text-primary">Browse Projects</h2>

      <Form className="mb-4">
        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search projects by title, skills, or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-pill ps-4 pe-5 border-0 shadow-sm bg-light"
          />

          {/* Clear (×) Button */}
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

          {/* Search Icon */}
          <FaSearch
            className="position-absolute top-50 translate-middle-y end-0 me-3 text-secondary opacity-75"
          />
        </Form.Group>
      </Form>

      {loading && (
        <div className="text-center my-5" aria-live="polite" aria-busy="true">
          <Spinner animation="border" variant="primary" role="status" />
          <div className="mt-2 text-primary fw-semibold">Loading projects...</div>
        </div>
      )}

      {error && (
        <UniversalAlert variant="error" show={showError} onClose={() => setShowError(false)}>
          {error}
        </UniversalAlert>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5">
          <FaFolderOpen size={64} className="text-muted mb-3" />
          <h5 className="fw-semibold text-muted">No projects found</h5>
          <p className="text-secondary" style={{ maxWidth: "420px" }}>
            We couldn't find any projects that match your search. Try different keywords or explore all available projects.
          </p>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProjects.map((project) => (
          <Col key={project._id}>
            <div className="shadow-sm rounded-4 h-100 p-2 bg-white border border-light-subtle">
              <ProjectCard project={project} role={user?.role} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrowseProjects;
