import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container className="mt-5">
      <h2>Welcome, {user}</h2>
      <button className="btn btn-danger mt-3" onClick={logout}>Logout</button>
    </Container>
  );
};

export default Dashboard;
