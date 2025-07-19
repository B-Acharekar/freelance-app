import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container className="mt-5 p-4 rounded bg-light shadow-sm">
      <h2 className="mb-3">👋 Welcome, <span className="text-primary">{user?.name || user?.email}</span></h2>
      <p className="mb-4">Your role: <span className="badge bg-secondary">{user?.role}</span></p>

      {user?.role === 'client' && (
        <div className="mb-3">
          <Link to="/projects/post" className="btn btn-outline-primary me-2">
            ➕ Post a Project
          </Link>
          <Link to="/projects/browse" className="btn btn-outline-success">
            🔍 Browse Projects
          </Link>
        </div>
      )}

      {user?.role === 'freelancer' && (
        <div className="mb-3">
          <Link to="/projects/browse" className="btn btn-outline-success">
            🔍 Browse Projects
          </Link>
        </div>
      )}

      <Button variant="danger" onClick={logout}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
