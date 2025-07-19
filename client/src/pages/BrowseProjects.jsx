import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

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
        console.error('Failed to fetch projects:', err);
        setError('Unable to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 fw-bold text-center text-primary">Browse Projects</h2>

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

      {!loading && !error && projects.length === 0 && (
        <p className="text-muted text-center">No projects available at the moment.</p>
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
