import React from "react";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/ProjectForm";
import { Container, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdPostAdd } from "react-icons/md";
import { showToast } from "../components/toast";

const PostProject = () => {
  const { user } = useAuth();

  if (!user || user.role !== "client") {
    showToast("error", "Access Denied – Only clients can post projects.");
    return null;
  }

  return (
    <Container className="my-5" style={{ maxWidth: "740px" }}>
      <Card className="shadow p-4 rounded-4 border-0">
        <div className="d-flex align-items-center mb-4">
          <MdPostAdd size={30} className="text-primary me-3" />
          <h2 className="mb-0 text-primary fw-bold">
            Post a New Project
          </h2>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip-info">
                Please describe your project with required skills and budget.
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

        {/* Pass hideTitle */}
        <ProjectForm
          hideTitle={true}
        />
      </Card>
    </Container>
  );
};

export default PostProject;
