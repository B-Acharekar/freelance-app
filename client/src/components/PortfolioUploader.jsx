import React, { useState } from "react";
import { Form, Button, Card, ProgressBar } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import UniversalAlert from "./UniversalAlert";
import { uploadFileToCloudinary } from "../services/uploadService";

const PortfolioUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState({ variant: "", message: "", show: false });

  const reset = () => {
    setFile(null);
    setProgress(0);
  };

  const handleFileChange = (e) => {
    reset();
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setAlert({ show: false });

    try {
      const res = await uploadFileToCloudinary(file, (evt) => {
        setProgress(Math.round((evt.loaded * 100) / evt.total));
      });

      setAlert({ variant: "success", message: "Uploaded successfully", show: true });
      onUpload(res.url); // ✅ FIXED: call correct prop
      reset();
    } catch {
      setAlert({ variant: "danger", message: "Upload failed. Try again.", show: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="shadow-none border-1 rounded-3 mb-3">
      <Form.Group>
        <Form.Label className="fw-medium">Select File</Form.Label>
        <Form.Control
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
          disabled={uploading}
        />
      </Form.Group>

      {uploading && (
        <ProgressBar
          now={progress}
          label={`${progress}%`}
          className="my-3"
          animated
          striped
        />
      )}

      {alert.show && (
        <UniversalAlert
          variant={alert.variant}
          show={alert.show}
          onClose={() => setAlert({ show: false })}
        >
          {alert.message}
        </UniversalAlert>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        variant="outline-primary"
        disabled={!file || uploading}
        className="mt-2 w-100"
      >
        <FaUpload className="me-2" />
        {uploading ? "Uploading…" : "Upload File"}
      </Button>
    </Card>
  );
};

export default PortfolioUploader;
