import React, { useEffect, useState } from 'react';
import { getPostedProjects } from '../services/projectService';
import { fetchApplicationsByProject } from '../services/applicationService';
import { NavLink } from 'react-router-dom';
import { Card, Container, ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaComments, FaBriefcase, FaUserTie, FaPen } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import DeleteProjectButton from '../components/DeleteProjectButton';

const PostedProjects = () => {
  const [postedProjects, setPostedProjects] = useState([]);
  const [applicationsMap, setApplicationsMap] = useState({});
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchProjectsAndApps = async () => {
      try {
        const res = await getPostedProjects(token);
        setPostedProjects(res.data);

        const allApplications = {};
        for (const project of res.data) {
          const appsRes = await fetchApplicationsByProject(project._id, token);
          allApplications[project._id] = appsRes.data;
        }
        setApplicationsMap(allApplications);
      } catch (err) {
        console.error("Failed to load posted projects or applications", err);
      }
    };

    if (token) fetchProjectsAndApps();
  }, [token]);

  if (!user || user.role !== 'client') {
    return (
      <Container className="mt-5">
        <h4 className="text-center text-danger">Access Denied</h4>
        <p className="text-center">Only clients can view posted projects.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold text-primary">
        <FaBriefcase className="me-2" />
        Your Posted Projects
      </h2>

      {postedProjects.length === 0 ? (
        <p className="text-muted">You haven't posted any projects yet.</p>
      ) : (
        postedProjects.map((project) => (
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
                    onDelete={(deletedId) => {
                      setPostedProjects((prev) =>
                        prev.filter((proj) => proj?._id && proj._id !== deletedId)
                      );
                    }}
                  />
                  <NavLink
                    to={`/applications/project/${project._id}`}
                    className="btn btn-sm btn-outline-primary rounded-pill"
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
