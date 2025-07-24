import React, { useEffect, useState } from 'react';
import { getPostedProjects } from '../services/projectService';
import { fetchApplicationsByProject } from '../services/applicationService';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Container,
  ListGroup,
  Button,
  Badge,
  Row,
  Col,
  Spinner,
  Form,
} from 'react-bootstrap';
import { FaComments, FaBriefcase, FaUserTie, FaPen, FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import DeleteProjectButton from '../components/DeleteProjectButton';
import { showToast } from '../components/toast'; // ✅ NEW

const PostedProjects = () => {
  const [postedProjects, setPostedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [applicationsMap, setApplicationsMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchProjectsAndApps = async () => {
      setLoading(true);
      try {
        const res = await getPostedProjects(token);
        setPostedProjects(res.data);
        setFilteredProjects(res.data);

        const apps = {};
        for (const project of res.data) {
          const appRes = await fetchApplicationsByProject(project._id, token);
          apps[project._id] = appRes.data;
        }
        setApplicationsMap(apps);
      } catch (err) {
        console.error('Failed to load posted projects or applications', err);
        showToast("error", "Failed to load your posted projects. Please try again later."); // ✅
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProjectsAndApps();
  }, [token]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = postedProjects.filter((project) => {
      const text = `${project.title} ${project.description}`.toLowerCase();
      return text.includes(term);
    });

    setFilteredProjects(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProjects(postedProjects);
  };

  const handleDelete = (deletedId) => {
    const updated = postedProjects.filter((proj) => proj._id !== deletedId);
    setPostedProjects(updated);
    setFilteredProjects(updated);
    showToast("success", "Project deleted successfully."); // ✅
  };

  if (!user || user.role !== 'client') {
    return (
      <Container className="mt-5">
        <h4 className="text-center text-danger">Access Denied</h4>
        <p className="text-center">Only clients can view posted projects.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: '1140px' }}>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Your Posted Projects</h2>
      </div>

      <Form className="mb-4">
        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-pill ps-4 pe-5 border-0 shadow-sm bg-light"
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
          <FaSearch className="position-absolute top-50 translate-middle-y end-0 me-3 text-secondary opacity-75" />
        </Form.Group>
      </Form>

      {loading ? (
        <div className="text-center my-5" aria-busy="true">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 fw-semibold text-primary">Loading your posted projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center text-muted py-5">
          <h5>No matching projects found</h5>
          <p>Try different keywords or clear the search input.</p>
        </div>
      ) : (
        filteredProjects.map((project) => (
          <Card key={project._id} className="mb-4 border-0 shadow-sm rounded-4 p-3">
            <Card.Body>
              <Row className="align-items-center mb-3">
                <Col md={9}>
                  <h4 className="fw-bold mb-1">
                    {project.title}{' '}
                    <Badge bg="info" pill className="ms-2">
                      {applicationsMap[project._id]?.length || 0} Applicants
                    </Badge>
                  </h4>
                  <p className="text-muted mb-0">{project.description}</p>
                </Col>
                <Col md={3} className="text-md-end mt-3 mt-md-0">
                  <NavLink
                    to={`/projects/edit/${project._id}`}
                    className="btn btn-sm btn-outline-secondary rounded-pill me-2"
                  >
                    <FaPen className="me-1" /> Edit
                  </NavLink>
                  <DeleteProjectButton
                    projectId={project._id}
                    onDelete={handleDelete}
                  />
                  <NavLink
                    to={`/applications/project/${project._id}`}
                    className="btn btn-sm btn-outline-primary rounded-pill mt-2 mt-md-0"
                  >
                    View All
                  </NavLink>
                </Col>
              </Row>

              <hr className="my-3" />
              <h6 className="text-muted fw-semibold mb-3">Recent Applicants</h6>

              {applicationsMap[project._id]?.length > 0 ? (
                <ListGroup variant="flush">
                  {applicationsMap[project._id].map((app) => (
                    <ListGroup.Item
                      key={app._id}
                      className="d-flex justify-content-between align-items-center px-0 border-bottom py-2"
                    >
                      <div>
                        <div className="fw-semibold">
                          <FaUserTie className="me-2 text-secondary" />
                          {app.freelancerName || app.freelancerId?.name || 'Unnamed Freelancer'}
                        </div>
                        <div className="text-muted small">{app.coverLetter}</div>
                      </div>
                      <NavLink
                        to={`/chatroom/${app.freelancerId}/${project._id}`}
                        className="btn btn-outline-dark btn-sm rounded-pill"
                      >
                        <FaComments className="me-1" />
                        Message
                      </NavLink>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No applicants for this project yet.</p>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default PostedProjects;
