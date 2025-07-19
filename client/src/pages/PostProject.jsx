import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectForm from '../components/ProjectForm';

const PostProject = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'client') {
    return <div className="text-red-600 text-center mt-10">Access Denied – Only clients can post projects.</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Post a New Project</h2>
      <ProjectForm onSuccess={() => alert('Project posted successfully!')} />
    </div>
  );
};

export default PostProject;
