// src/components/PortfolioUploader.jsx
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, ProgressBar } from "react-bootstrap";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import UniversalAlert from "./UniversalAlert"; // ✅ your custom alert component

const PortfolioUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl(null);
    setError(null);
    setShowSuccess(false);
    setShowError(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError(null);
    setShowSuccess(false);
    setShowError(false);

    try {
      const res = await axios.post("http://localhost:5000/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
        withCredentials: true,
      });

      setUploadedUrl(res.data.url);
      setFile(null);
      setShowSuccess(true);
    } catch (err) {
      console.error("Upload Error:", err);
      setError("Upload failed. Please try again.");
      setShowError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="shadow-sm p-4 rounded-4 border-0 mb-4">
      <h5 className="mb-3 fw-semibold">Upload Portfolio</h5>

      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
        </Form.Group>

        {uploading && (
          <ProgressBar now={progress} label={`${progress}%`} className="mb-3" animated striped />
        )}

        {uploadedUrl && (
          <UniversalAlert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)}>
            File uploaded!{" "}
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="fw-semibold">
              View
            </a>
          </UniversalAlert>
        )}

        {error && (
          <UniversalAlert variant="error" show={showError} onClose={() => setShowError(false)}>
            {error}
          </UniversalAlert>
        )}

        <Button variant="primary" type="submit" disabled={uploading}>
          <FaUpload className="me-2" />
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </Form>
    </Card>
  );
};

export default PortfolioUploader;
