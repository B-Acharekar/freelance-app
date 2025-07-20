import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { FaExclamationCircle, FaFolderOpen } from "react-icons/fa";

const BrowseProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchAllProjects();
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Unable to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <Container className="mt-5" style={{ maxWidth: "1140px" }}>
      <h2
        className="mb-5 fw-bold text-center text-primary"
        style={{ letterSpacing: "0.05em", fontWeight: "700" }}
      >
        Browse Projects
      </h2>

      {loading && (
        <div
          className="text-center my-5"
          style={{ opacity: 0.8, transition: "opacity 0.5s ease-in" }}
          aria-live="polite"
          aria-busy="true"
        >
          <Spinner animation="border" variant="primary" role="status" />
          <div className="mt-2 text-primary fw-semibold">Loading projects...</div>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="d-flex align-items-center justify-content-center gap-2">
          <FaExclamationCircle size={24} />
          <span>{error}</span>
        </Alert>
      )}

      {!loading && !error && projects.length === 0 && (
        <div
          className="text-center text-muted d-flex flex-column align-items-center gap-2"
          style={{ fontSize: "1.15rem", marginTop: "3rem" }}
        >
          <FaFolderOpen size={48} />
          <p>No projects available at the moment.</p>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {projects.map((project) => (
          <Col key={project._id}>
            <ProjectCard project={project} role={user?.role} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrowseProjects;
