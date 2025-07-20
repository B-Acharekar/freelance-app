import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../services/projectService";
import InfoCard from "../components/InfoCard";
import {
  Form,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaHeading,
  FaFileAlt,
  FaDollarSign,
  FaTools,
} from "react-icons/fa";

const ProjectForm = ({ onSuccess }) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
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
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      };

      await createProject(body, token);
      setFormData({ title: "", description: "", budget: "", skillsRequired: "" });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to post project:", error);
      // Errors handled outside, so no local alert here
    }
  };

  return (
    <InfoCard title="Post a New Project">
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-4" controlId="projectTitle">
          <Form.Label className="fw-semibold">Project Title</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaHeading />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-4" controlId="projectDescription">
          <Form.Label className="fw-semibold">Project Description</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaFileAlt />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Describe your project"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ resize: "vertical" }}
            />
          </InputGroup>
        </Form.Group>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="projectBudget">
              <Form.Label className="fw-semibold">Budget ($)</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaDollarSign />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  name="budget"
                  placeholder="Your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="projectSkills">
              <Form.Label className="fw-semibold">Skills Required</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaTools />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="skillsRequired"
                  placeholder="Comma separated skills"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="success"
          type="submit"
          className="w-100 rounded-pill shadow-sm fw-semibold py-2"
          size="lg"
        >
          Post Project
        </Button>
      </Form>
    </InfoCard>
  );
};

export default ProjectForm;
