import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlus,
  FaSearch,
  FaFolderOpen,
  FaClipboardList,
  FaSignOutAlt,
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Welcome, {user?.name || user?.email}</h2>
          <Badge bg="dark" className="text-uppercase">{user?.role}</Badge>
        </div>
      </div>

      <Row className="g-4">
        {user?.role === 'client' && (
          <>
            <Col md={4}>
              <Card className="h-100 shadow border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    <FaPlus className="me-2 text-primary" />Post a Project
                  </Card.Title>
                  <Card.Text className="text-muted">Hire top freelancers by posting your project needs.</Card.Text>
                  <Link to="/projects/post" className="btn btn-primary w-100">Post Now</Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    <FaSearch className="me-2 text-success" />Browse Projects
                  </Card.Title>
                  <Card.Text className="text-muted">Explore ongoing projects and freelancer profiles.</Card.Text>
                  <Link to="/projects/browse" className="btn btn-success w-100">Browse</Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 shadow border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    <FaFolderOpen className="me-2 text-warning" />My Projects
                  </Card.Title>
                  <Card.Text className="text-muted">Manage and track all your posted projects.</Card.Text>
                  <Link to="/my-projects" className="btn btn-warning text-white w-100">View</Link>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}

        {user?.role === 'freelancer' && (
          <>
            <Col md={6}>
              <Card className="h-100 shadow border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    <FaSearch className="me-2 text-success" />Browse Projects
                  </Card.Title>
                  <Card.Text className="text-muted">Find work that matches your skills and goals.</Card.Text>
                  <Link to="/projects/browse" className="btn btn-success w-100">Find Projects</Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="h-100 shadow border-0 bg-light">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    <FaClipboardList className="me-2 text-info" />My Applications
                  </Card.Title>
                  <Card.Text className="text-muted">Track your bids and application statuses.</Card.Text>
                  <Link to="/applications/my" className="btn btn-info text-white w-100">Track</Link>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
