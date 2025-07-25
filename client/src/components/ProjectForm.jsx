import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createProject, updateProject } from "../services/projectService";
import InfoCard from "../components/InfoCard";
import {
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  FaHeading,
  FaFileAlt,
  FaRupeeSign,
  FaTools,
} from "react-icons/fa";
import { showToast } from "../components/toast";
import { useNavigate } from "react-router-dom";

const ProjectForm = ({hideTitle, initialData = null, projectId = null }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        skillsRequired: initialData.skillsRequired?.join(", ") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (projectId) {
        await updateProject(projectId, body, token);
        showToast("success", "Project updated successfully!");
        navigate("/dashboard");
      } else {
        await createProject(body, token);
        showToast("success", "Project posted successfully!");
      }
    } catch (error) {
      showToast("error", "Failed to submit project. Please try again.");
      console.error("Project submission error:", error);
    }
  };

  return (
    <InfoCard title={!hideTitle ? (projectId ? "Edit Project" : "Post a New Project") : null}>
      <Form onSubmit={handleSubmit} noValidate className="px-2 py-1">
        {/* Title */}
        <Form.Group className="mb-4" controlId="projectTitle">
          <Form.Label className="fw-semibold">Project Title</Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaHeading />
            </InputGroup.Text>
            <Form.Control
              className="border-start-0"
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="projectDescription">
          <Form.Label className="fw-semibold">Project Description</Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-white border-end-0">
              <FaFileAlt />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              placeholder="Describe your project in detail"
              value={formData.description}
              onChange={handleChange}
              required
              className="border-start-0"
              style={{ resize: "vertical" }}
            />
          </InputGroup>
        </Form.Group>

        {/* Budget & Skills */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="projectBudget">
              <Form.Label className="fw-semibold">Budget (₹)</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaRupeeSign />
                </InputGroup.Text>
                <Form.Control
                  className="border-start-0"
                  type="number"
                  name="budget"
                  placeholder="Proposed budget"
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
                <InputGroup.Text className="bg-white border-end-0">
                  <FaTools />
                </InputGroup.Text>
                <Form.Control
                  className="border-start-0"
                  type="text"
                  name="skillsRequired"
                  placeholder="e.g., React, Node, MongoDB"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              {/* Skill Preview */}
              <div className="mt-2">
                {formData.skillsRequired
                  .split(",")
                  .map((skill, idx) => skill.trim())
                  .filter(Boolean)
                  .map((skill, idx) => (
                    <Badge
                      key={idx}
                      bg="secondary"
                      className="me-2 mb-1 py-1 px-2 rounded-pill"
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button
          variant={projectId ? "primary" : "success"}
          type="submit"
          className="w-100 rounded-pill fw-semibold shadow-sm py-2"
          size="lg"
        >
          {projectId ? "Update Project" : "Post Project"}
        </Button>
      </Form>
    </InfoCard>
  );
};

export default ProjectForm;
