import {Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaExternalLinkAlt, FaFileDownload,FaEdit  } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteApplicationButton from "./DeleteApplicationButton";

const ApplicationCard = ({ app,onDelete  }) => {
  const {
    _id,
    projectTitle,
    projectDescription,
    bidAmount,
    status,
    coverLetter,
    portfolioLink,
    portfolioFile,
    createdAt,
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
    <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
      <Card.Body className="position-relative">
        <Badge
          bg={getStatusVariant()}
          className="position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill text-uppercase shadow-sm"
          style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
        >
          {status || "pending"}
        </Badge>

        <Card.Title className="fw-semibold text-dark fs-5 mb-2">
          {projectTitle || "Untitled Project"}
        </Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          <span className="fw-semibold">Bid:</span> ₹{bidAmount}
        </Card.Subtitle>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>{coverLetter}</Tooltip>}
        >
          <Card.Text
            className="text-muted text-truncate"
            style={{ maxWidth: "100%", cursor: "help" }}
          >
            <strong>Cover Letter:</strong> {coverLetter}
          </Card.Text>
        </OverlayTrigger>

        {/* Portfolio Link */}
        {portfolioLink && (
          <Card.Text className="mt-3">
            <strong>Portfolio:</strong>{" "}
            <a
              href={portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-1"
            >
              View Website <FaExternalLinkAlt size={12} />
            </a>
          </Card.Text>
        )}

        {/* Portfolio File */}
        {portfolioFile && (
          <Card.Text className="mt-2">
            <strong>Portfolio File:</strong>{" "}
            <a
              href={portfolioFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-success fw-semibold d-inline-flex align-items-center gap-1"
              download
            >
              Download File <FaFileDownload size={14} />
            </a>
          </Card.Text>
        )}

        <Card.Text className="text-muted small mt-4">
          <em>Applied on:</em>{" "}
          {new Date(createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Card.Text>

        {/* Action Buttons */}
        <div className="d-flex mt-3 gap-2">
          <Link
            to={`/applications/edit/${_id}`}
            className="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center gap-1"
          >
            <FaEdit size={14} /> Edit
          </Link>

          <DeleteApplicationButton applicationId={_id} onDelete={onDelete} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ApplicationCard;
