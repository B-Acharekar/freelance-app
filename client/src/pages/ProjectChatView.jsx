// pages/ProjectChatView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Card, Badge } from "react-bootstrap";
import { fetchProjectById } from "../services/projectService";
import { useAuth } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import { FaComments, FaRupeeSign, FaTools } from "react-icons/fa";

const ProjectChatView = () => {
  const { projectId, receiverId } = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await fetchProjectById(projectId);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  if (!user || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container fluid className="py-4 px-3 px-md-4">
      <Row className="gx-4">
        {/* Left: Project Overview */}
        <Col md={5}>
          <Card className="shadow-sm border-0 rounded-4 bg-light h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div>
                <h4 className="fw-bold text-dark mb-3">{project?.title}</h4>
                <p className="text-muted mb-4" style={{ minHeight: "100px" }}>
                  {project?.description}
                </p>

                <div className="mb-3">
                  <h6 className="fw-semibold text-secondary mb-2">
                    <FaTools className="me-2" />
                    Skills Required:
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {project?.skillsRequired?.map((skill, idx) => (
                      <Badge
                        key={idx}
                        bg="secondary"
                        className="rounded-pill px-3 py-1 text-light"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h6 className="fw-semibold text-secondary">
                    <FaRupeeSign className="me-1" />
                    Budget:
                    <span className="text-dark ms-2">₹{project?.budget}</span>
                  </h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right: Chat UI */}
        <Col md={7}>
          <Card className="shadow-lg border-0 rounded-4 h-100 d-flex flex-column">
            {/* Header */}
            <Card.Header className="bg-white border-bottom rounded-top-4 px-4 py-3 d-flex align-items-center justify-content-between shadow-sm">
              <div className="d-flex align-items-center gap-2">
                <FaComments className="text-primary fs-5" />
                <h5 className="mb-0 fw-semibold text-dark">Project Chat</h5>
              </div>
              <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill">
                Live
              </span>
            </Card.Header>

            {/* Chat Body */}
            <Card.Body className="bg-light p-0 flex-grow-1 d-flex flex-column" style={{ minHeight: "500px" }}>
              <ChatBox
                currentUserId={user._id}
                receiverId={receiverId}
                projectId={projectId}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectChatView;
