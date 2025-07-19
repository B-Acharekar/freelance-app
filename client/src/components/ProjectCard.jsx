// src/components/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md mb-4">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
      <p className="mt-2 text-sm text-blue-600 font-medium">💰 Budget: ₹{project.budget}</p>
      <p className="text-sm mt-1">🔧 Skills: {project.skillsRequired.join(', ')}</p>
      <p className="text-xs mt-1 text-gray-500">Posted by: {project.clientId?.name} ({project.clientId?.email})</p>
    </div>
  );
};

export default ProjectCard;
