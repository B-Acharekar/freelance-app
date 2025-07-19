import React, { useEffect, useState } from 'react';
import { fetchAllProjects } from '../services/projectService';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetchAllProjects();
        setProjects(res.data);  // res.data should be array of projects
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (!projects.length) {
    return <p className="text-center text-gray-600">No projects available right now.</p>;
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
