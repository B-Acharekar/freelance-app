import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../services/projectService';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetchAllProjects();
        setProjects(res.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (!projects.length) {
    return (
      <p className="text-center text-muted fs-5 mt-4">
        😕 No projects available at the moment.
      </p>
    );
  }

  return (
    <div className="row g-4">
      {projects.map((project) => (
        <div key={project._id} className="col-md-6">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
