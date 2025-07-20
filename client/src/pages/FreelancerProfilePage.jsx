import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaCode, FaBriefcase } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getFreelancerById } from '../services/userService';

const FreelancerProfilePage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [freelancer, setFreelancer] = useState(null);

  useEffect(() => {
    if (!id || !token) return;

    const fetchProfile = async () => {
      try {
        const data = await getFreelancerById(id, token);
        setFreelancer(data);
      } catch (err) {
        console.error("Failed to fetch freelancer profile", err.message);
      }
    };

    fetchProfile();
  }, [id, token]);

  if (!freelancer) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '80vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <main>
      <Container className="py-5" style={{ position: 'relative', minHeight: '80vh' }}>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg rounded-4 border-0">
              <Card.Body className="p-4">
                {/* Header with Icon */}
                <div className="d-flex align-items-center mb-4">
                  <FaUserCircle size={60} className="text-primary me-3" />
                  <div>
                    <h2 className="fw-bold mb-1">{freelancer.name}</h2>
                    <small className="text-muted text-uppercase fst-italic">
                      {freelancer.role || 'Freelancer'}
                    </small>
                  </div>
                </div>

                {/* Contact & Experience */}
                <div className="mb-3">
                  <p className="mb-2 d-flex align-items-center gap-2">
                    <FaEnvelope className="text-muted" />
                    <span>
                      <strong>Email:</strong> {freelancer.email}
                    </span>
                  </p>
                  <p className="mb-2 d-flex align-items-center gap-2">
                    <FaBriefcase className="text-muted" />
                    <span>
                      <strong>Experience:</strong> {freelancer.experience || 'N/A'}
                    </span>
                  </p>
                </div>

                {/* Skills as badges */}
                <div className="mb-4">
                  <p className="mb-2 d-flex align-items-center gap-2">
                    <FaCode className="text-muted" />
                    <strong>Skills:</strong>
                  </p>
                  {freelancer.skills?.length > 0 ? (
                    <div>
                      {freelancer.skills.map((skill, idx) => (
                        <Badge
                          bg="info"
                          text="dark"
                          key={idx}
                          className="me-2 mb-2 px-3 py-2 fs-6"
                          style={{ userSelect: 'none' }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted fst-italic">No skills listed.</p>
                  )}
                </div>

                <hr />

                {/* Bio */}
                <div>
                  <h5 className="fw-semibold mb-3">About Me</h5>
                  <p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                    {freelancer.bio || 'No bio available.'}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FreelancerProfilePage;
