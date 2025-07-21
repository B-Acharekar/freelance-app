import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { applyForProject } from "../services/applicationService";
import PortfolioUploader from "../components/PortfolioUploader";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ApplyForProject = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [formData, setFormData] = useState({
    coverLetter: "",
    bidAmount: "",
    portfolioLink: "",
    portfolioFileUrl: "",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePortfolioUpload = (url) => {
    setFormData((prev) => ({ ...prev, portfolioFileUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.portfolioFileUrl) {
      setVariant("warning");
      setMessage("Please upload a portfolio file before submitting.");
      return;
    }

    try {
      const res = await applyForProject(
        projectId,
        {
          ...formData,
          portfolioFile: formData.portfolioFileUrl,
        },
        token
      );

      if (res.status === 201) {
        setVariant("success");
        setMessage("Application submitted successfully!");
        setFormData({
          coverLetter: "",
          bidAmount: "",
          portfolioLink: "",
          portfolioFileUrl: "",
        });
        const timeout = setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
    } catch (error) {
      console.error("Application error:", error);
      setVariant("danger");
      setMessage("Failed to submit application. Try again.");
    }
  };

  return (
    <Card className="p-4 shadow-sm rounded-4 mt-4">
      <h3 className="mb-4">Apply for Project</h3>
      {message && <Alert variant={variant}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Cover Letter</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            required
            placeholder="Write a brief cover letter..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bid Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            name="bidAmount"
            value={formData.bidAmount}
            onChange={handleChange}
            required
            placeholder="Enter your bid"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Portfolio Website (optional)</Form.Label>
          <Form.Control
            type="url"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Portfolio File (PDF/Images)</Form.Label>
          <PortfolioUploader onUpload={handlePortfolioUpload} />
          {formData.portfolioFileUrl && (
            <div className="text-success mt-2">
              Uploaded:{" "}
              <a href={formData.portfolioFileUrl} target="_blank" rel="noreferrer">
                View file
              </a>
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="rounded-pill">
          Submit Application
        </Button>
      </Form>
    </Card>
  );
};

export default ApplyForProject;
