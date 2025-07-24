import { useEffect, useState } from "react";
import { fetchProjectById, completeProject } from "../services/projectService";
import { getUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { Tabs, Tab, Spinner, Badge, Container, Row, Col, Button } from "react-bootstrap";
import { showToast } from "../components/toast"; // Optional if you want toast notifications

const MyFreelanceProjects = () => {
  const { token } = useAuth();
  const [key, setKey] = useState("active");
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(null);

  const fetchUserProjects = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const user = await getUserProfile(token);
      const current = user.currentProjects || [];
      const completed = user.completedProjects || [];

      const [activeDetails, completedDetails] = await Promise.all([
        Promise.all(current.map((id) => fetchProjectById(id).then((res) => res.data))),
        Promise.all(completed.map((id) => fetchProjectById(id).then((res) => res.data))),
      ]);

      setActiveProjects(activeDetails);
      setCompletedProjects(completedDetails);
    } catch (err) {
      console.error("Error loading projects:", err.message);
      showToast("error", "Failed to load your projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProjects();
  }, [token]);

  const handleComplete = async (projectId) => {
    setCompleting(projectId);
    try {
      await completeProject(projectId, token);
      showToast("success", "Project marked as complete.");
      fetchUserProjects();
    } catch (err) {
      showToast("error", "Failed to mark project as complete.");
    } finally {
      setCompleting(null);
    }
  };

  const ProjectCard = ({ project, isCompleted }) => (
    <Col md={6} lg={4} className="mb-4">
      <div className="border rounded-4 shadow-sm p-3 h-100 d-flex flex-column justify-content-between bg-white">
        <div>
          <h5 className="fw-bold text-primary">{project.title}</h5>
          <p className="text-muted" style={{ minHeight: "60px" }}>{project.description}</p>
          <p className="mb-2">
            <Badge bg="secondary">Budget: ₹{project.budget}</Badge>
          </p>
          {isCompleted && (
            <div className="text-success d-flex align-items-center gap-2 fw-semibold mt-2">
              <FaCheckCircle />
              <span>Completed</span>
            </div>
          )}
        </div>
        {!isCompleted && (
          <div className="mt-3 text-end">
            <Button
              variant={completing === project._id ? "secondary" : "success"}
              size="sm"
              onClick={() => handleComplete(project._id)}
              disabled={completing === project._id}
            >
              {completing === project._id ? "Completing..." : "Mark as Complete"}
            </Button>
          </div>
        )}
      </div>
    </Col>
  );

  return (
    <Container className="py-5">
      <h2 className="mb-4 fw-bold text-center text-primary">My Freelance Projects</h2>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 justify-content-center"
        fill
      >
        <Tab eventKey="active" title="Active Projects">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading your active projects...</p>
            </div>
          ) : activeProjects.length === 0 ? (
            <p className="text-center text-muted mt-4">You have no active projects.</p>
          ) : (
            <Row>
              {activeProjects.map((project) => (
                <ProjectCard key={project._id} project={project} isCompleted={false} />
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="completed" title="Completed Projects">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading your completed projects...</p>
            </div>
          ) : completedProjects.length === 0 ? (
            <p className="text-center text-muted mt-4">No completed projects yet.</p>
          ) : (
            <Row>
              {completedProjects.map((project) => (
                <ProjectCard key={project._id} project={project} isCompleted={true} />
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyFreelanceProjects;
