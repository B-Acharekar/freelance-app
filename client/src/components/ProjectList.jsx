import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../services/projectService";
import ProjectCard from "./ProjectCard";
import { Spinner, Container } from "react-bootstrap";
import { FaFolderOpen } from "react-icons/fa";
import UniversalAlert from "./UniversalAlert";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetchAllProjects();
        setProjects(res.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Explore Projects</h2>
        <p className="text-muted">Find freelance opportunities that match your skills.</p>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {!loading && error && (
        <UniversalAlert variant="error" show={true}>
          {error}
        </UniversalAlert>
      )}

      {!loading && !error && projects.length === 0 && (
        <UniversalAlert variant="info" show={true}>
          <FaFolderOpen className="me-2" />
          No projects available at the moment.
        </UniversalAlert>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {projects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ProjectList;
