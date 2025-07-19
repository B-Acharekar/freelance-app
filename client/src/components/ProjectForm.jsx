import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createProject } from '../services/projectService';

const ProjectForm = ({ onSuccess }) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    skillsRequired: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim()),
      };

      await createProject(body, token); // ✅ Use wrapper

      onSuccess?.();
    } catch (error) {
      console.error('Failed to post project:', error);
      alert('Error: Could not post project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        className="w-full p-2 border rounded"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        className="w-full p-2 border rounded"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="budget"
        placeholder="Budget"
        className="w-full p-2 border rounded"
        value={formData.budget}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="skillsRequired"
        placeholder="Skills (comma separated)"
        className="w-full p-2 border rounded"
        value={formData.skillsRequired}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Project
      </button>
    </form>
  );
};

export default ProjectForm;
