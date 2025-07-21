import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Button, Spinner, Alert, Card, Badge } from 'react-bootstrap';
import { getAdminData, blockUser } from '../services/adminService';
import AdminStatCard from '../components/AdminStatCard';
import AnnouncementPanel from '../components/AnnouncementPanel';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const { users, projects, applications } = await getAdminData();
      setUsers(users);
      setProjects(projects);
      setApplications(applications);
      setError("");
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setError("Unauthorized or session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBlockToggle = async (userId) => {
    try {
      await blockUser(userId);
      setUsers(prev =>
        prev.map(u => u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u)
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => !u.isBlocked).length,
    totalProjects: projects.length,
    totalApplications: applications.length,
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading admin dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>
      <Row className="g-4">
        <Col md={3}><AdminStatCard type="users" count={stats.totalUsers} label="Total Users" /></Col>
        <Col md={3}><AdminStatCard type="activeUsers" count={stats.activeUsers} label="Active Users" /></Col>
        <Col md={3}><AdminStatCard type="projects" count={stats.totalProjects} label="Total Projects" /></Col>
        <Col md={3}><AdminStatCard type="applications" count={stats.totalApplications} label="Total Applications" /></Col>
      </Row>

      <Tabs defaultActiveKey="users" className="my-5 pt-4">
        {/* USERS */}
        <Tab eventKey="users" title="Users">
          <Row className="g-4 mt-3">
            {users.map(u => (
              <Col md={4} key={u._id}>
                <Card className="shadow-sm rounded-4 p-3 h-100">
                  <Card.Body>
                    <Card.Title className="fw-bold">{u.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{u.email}</Card.Subtitle>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Badge bg={u.isBlocked ? "danger" : "success"}>
                        {u.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                      <small className="text-muted">{u.role}</small>
                    </div>

                    <Button
                      variant={u.isBlocked ? 'success' : 'danger'}
                      size="sm"
                      className="mt-3 w-100"
                      onClick={() => handleBlockToggle(u._id)}
                    >
                      {u.isBlocked ? 'Unblock' : 'Block'}
                    </Button>

                    <p className="text-muted text-end mt-2 mb-0">
                      <small>Joined on: {new Date(u.createdAt).toLocaleDateString()}</small>
                    </p>
                  </Card.Body>
                </Card>

              </Col>
            ))}
          </Row>
        </Tab>

        {/* PROJECTS */}
        <Tab eventKey="projects" title="Projects">
          <Row className="g-4 mt-3">
            {projects.map(p => (
              <Col md={4} key={p._id}>
                <Card className="shadow-sm rounded-4 p-3 h-100">
                  <Card.Body>
                    <Card.Title className="fw-bold">{p.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Client: {p.clientName || p.clientId?.name || p.clientId?._id}
                    </Card.Subtitle>
                    <p className="mt-3">
                      <strong>Budget:</strong> ${p.budget}
                    </p>
                    <p className="text-muted mt-2">
                      <small>Posted on: {new Date(p.createdAt).toLocaleDateString()}</small>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        {/* APPLICATIONS */}
        <Tab eventKey="applications" title="Applications">
          <Row className="g-4 mt-3">
            {applications.map(app => (
              <Col md={4} key={app._id}>
                <Card className="shadow-sm rounded-4 p-3 h-100">
                  <Card.Body>
                    <Card.Title>
                      {app.freelancerName || app.freelancerId?.name || app.freelancerId?._id}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Project: {app.projectTitle || app.projectId?.title || app.projectId?._id}
                    </Card.Subtitle>
                    <p className="mb-1"><strong>Bid:</strong> ${app.bidAmount}</p>
                    <p className="text-muted mt-2">
                      <small>Applied on: {new Date(app.createdAt).toLocaleDateString()}</small>
                    </p>
                    <Badge bg="secondary">{app.status}</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="announcements" title="Announcements">
          <AnnouncementPanel />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
