import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";

const ApplicationCard = ({ app }) => {
  const {
    projectTitle,
    projectDescription,
    bidAmount,
    status,
    coverLetter,
    portfolioLink,
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
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="position-relative">
        <Badge
          bg={getStatusVariant()}
          className="position-absolute top-0 end-0 m-2 px-3 py-2"
        >
          {status?.toUpperCase() || "PENDING"}
        </Badge>

        <Card.Title className="fw-bold text-primary">
          {projectTitle || "Untitled Project"}
        </Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          Bid Amount: <strong>${bidAmount}</strong>
        </Card.Subtitle>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>{coverLetter}</Tooltip>
          }
        >
          <Card.Text className="text-truncate" style={{ maxWidth: "100%" }}>
            <strong>Cover Letter:</strong><br />
            {coverLetter}
          </Card.Text>
        </OverlayTrigger>

        {portfolioLink && (
          <Card.Text className="mt-2">
            <strong>Portfolio:</strong>{" "}
            <a
              href={portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              View Project
            </a>
          </Card.Text>
        )}

        <Card.Text className="text-muted small mt-3">
          Applied on: {new Date(createdAt).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ApplicationCard;
