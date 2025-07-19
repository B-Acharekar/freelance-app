import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectForm from '../components/ProjectForm';
import { Container, Card, Alert } from 'react-bootstrap';

const PostProject = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  if (!user || user.role !== 'client') {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          Access Denied – Only clients can post projects.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm p-4">
        <h2 className="mb-4 text-center text-primary">Post a New Project</h2>

        {success && (
          <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
            Project posted successfully!
          </Alert>
        )}

        <ProjectForm onSuccess={() => setSuccess(true)} />
      </Card>
    </Container>
  );
};

export default PostProject;
