import React from "react";
import { Card, Badge, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaComments } from "react-icons/fa";

const ApplicationReviewCard = ({ app, onDecision, currentUserRole, currentUserId }) => {
  const {
    _id: applicationId,
    status,
    projectTitle,
    bidAmount,
    coverLetter,
    portfolioLink,
    createdAt,
    freelancerId, // This should be freelancer user id (object or string)
  } = app;

  const getStatusVariant = () => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      case "pending":
      default:
        return "secondary";
    }
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="position-relative">
        <Badge
          bg={getStatusVariant()}
          className="position-absolute top-0 end-0 m-2 px-3 py-2"
        >
          {status?.toUpperCase() || "PENDING"}
        </Badge>

        <Card.Title className="fw-bold text-primary">{projectTitle || "Untitled Project"}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          Bid Amount: <strong>${bidAmount}</strong>
        </Card.Subtitle>

        <OverlayTrigger placement="top" overlay={<Tooltip>{coverLetter}</Tooltip>}>
          <Card.Text className="text-truncate" style={{ maxWidth: "100%" }}>
            <strong>Cover Letter:</strong>
            <br />
            {coverLetter}
          </Card.Text>
        </OverlayTrigger>

        {portfolioLink && (
          <Card.Text className="mt-2">
            <strong>Portfolio:</strong>{" "}
            <a href={portfolioLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              View Project
            </a>
          </Card.Text>
        )}

        <Card.Text className="text-muted small mt-3">
          Applied on: {new Date(createdAt).toLocaleDateString()}
        </Card.Text>

        {/* Decision buttons - only for client */}
        {currentUserRole === "client" && status === "pending" && (
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" size="sm" onClick={() => onDecision(applicationId, "accepted")}>
              Accept
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDecision(applicationId, "rejected")}>
              Reject
            </Button>
          </div>
        )}

        {/* Chat button for client to message freelancer */}
        {currentUserRole === "client" && (
          <NavLink
            to={`/chatroom/${freelancerId}/${app.projectId || app.project?._id}`}
            className="btn btn-sm btn-outline-dark mt-3"
          >
            <FaComments className="me-1" /> Message Freelancer
          </NavLink>
        )}
      </Card.Body>
    </Card>
  );
};

export default ApplicationReviewCard;
