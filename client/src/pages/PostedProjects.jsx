import React, { useEffect, useState } from 'react';
import { getPostedProjects } from '../services/projectService'; 
import { fetchApplicationsByProject } from '../services/applicationService';
import { NavLink } from 'react-router-dom';
import { Card, Container, ListGroup, Button } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const PostedProjects = () => {
  const [postedProjects, setPostedProjects] = useState([]);
  const [applicationsMap, setApplicationsMap] = useState({}); // { projectId: [applications] }
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchProjectsAndApps = async () => {
      try {
        // Fetch posted projects
        const res = await getPostedProjects(token);
        setPostedProjects(res.data);

        // For each project, fetch applications
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
    return <p className="text-center mt-5">Access denied. Only clients can see posted projects.</p>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Your Posted Projects</h2>
      {postedProjects.length === 0 ? (
        <p>No projects posted yet.</p>
      ) : (
        postedProjects.map((project) => (
          <Card key={project._id} className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>

              <NavLink
                className="btn btn-sm btn-outline-primary mb-3"
                to={`/applications/project/${project._id}`}
              >
                View Applicants
              </NavLink>

              {/* List applicants directly here */}
              <h6>Applicants:</h6>
              {applicationsMap[project._id]?.length > 0 ? (
                <ListGroup>
                  {applicationsMap[project._id].map((app) => (
                    <ListGroup.Item key={app._id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{app.freelancerName || app.freelancerId?.name || 'Unnamed Freelancer'}</strong>
                        <div className="small text-muted">{app.coverLetter}</div>
                      </div>

                      <NavLink
                        to={`/chatroom/${app.freelancerId}/${project._id}`}
                        className="btn btn-sm btn-outline-dark"
                      >
                        <FaComments className="me-1" /> Message Freelancer
                      </NavLink>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No applicants yet.</p>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default PostedProjects;
