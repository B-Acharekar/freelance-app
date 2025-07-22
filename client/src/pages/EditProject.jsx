import React, { useEffect, useState } from 'react';
import { fetchProjectById   } from '../services/projectService';
import ProjectForm from '../components/ProjectForm';
import { useParams, useNavigate } from 'react-router-dom';

const EditProject = () => {
  const { projectid  } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      const { data } = await fetchProjectById  (projectid );
      setProject(data);
    };
    loadProject();
  }, [projectid ]);

  return project ? (
    <ProjectForm
      initialData={project}
      projectId ={projectid }
      onSuccess={() => navigate('/my-projects')}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default EditProject;
