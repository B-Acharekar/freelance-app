import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/ProjectForm";
import { Container, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import UniversalAlert from "../components/UniversalAlert";
import { MdPostAdd } from "react-icons/md";

const PostProject = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  if (!user || user.role !== "client") {
    return (
      <Container className="mt-5">
        <UniversalAlert variant="error" show={true}>
          Access Denied – Only clients can post projects.
        </UniversalAlert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "720px" }}>
      <Card className="shadow-sm p-4 rounded-4 border-0">
        <div className="d-flex align-items-center mb-4">
          <MdPostAdd size={32} className="text-primary me-3" />
          <h2 className="mb-0 text-primary fw-bold">
            Post a New Project
          </h2>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-info">
                Fill out the form carefully with all project details.
              </Tooltip>
            }
          >
            <span
              className="ms-2 text-primary"
              style={{ cursor: "pointer", fontSize: "1.25rem" }}
            >
              &#9432;
            </span>
          </OverlayTrigger>
        </div>

        <UniversalAlert
          variant="success"
          show={success}
          onClose={() => setSuccess(false)}
        >
          Project posted successfully!
        </UniversalAlert>

        <ProjectForm onSuccess={() => setSuccess(true)} />
      </Card>
    </Container>
  );
};

export default PostProject;
