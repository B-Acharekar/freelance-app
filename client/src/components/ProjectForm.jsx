import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../services/projectService";
import InfoCard from "../components/InfoCard";
import { Form, Button, Alert } from "react-bootstrap";

const ProjectForm = ({ onSuccess }) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
  });

  const [message, setMessage] = useState("");

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

      await createProject(body, token);
      setMessage("Project posted successfully.");
      setFormData({ title: "", description: "", budget: "", skillsRequired: "" });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to post project:", error);
      setMessage("Error: Could not post project.");
    }
  };

  return (
    <InfoCard title="Post a New Project">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="skillsRequired"
            placeholder="Skills (comma separated)"
            value={formData.skillsRequired}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">Post Project</Button>
      </Form>

      {message && <Alert className="mt-3" variant="info">{message}</Alert>}
    </InfoCard>
  );
};

export default ProjectForm;
