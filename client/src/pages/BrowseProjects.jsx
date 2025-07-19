import React from 'react';
import ProjectList from '../components/ProjectList';

const BrowseProjects = () => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Available Projects</h2>
      <ProjectList />
    </div>
  );
};

export default BrowseProjects;
