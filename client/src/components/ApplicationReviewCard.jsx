import { Card, Button } from "react-bootstrap";

const ApplicationReviewCard = ({ app, onDecision }) => {
  const { freelancerId, bidAmount, coverLetter, portfolioLink, status } = app;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{freelancerId?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{freelancerId?.email}</Card.Subtitle>
        <Card.Text><strong>Bid:</strong> ${bidAmount}</Card.Text>
        <Card.Text><strong>Cover Letter:</strong> {coverLetter}</Card.Text>
        <Card.Text>
          <strong>Portfolio:</strong>{" "}
          <a href={portfolioLink} target="_blank" rel="noreferrer">
            {portfolioLink}
          </a>
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong>{" "}
          <span className={`text-${status === "accepted" ? "success" : status === "rejected" ? "danger" : "secondary"}`}>
            {status || "pending"}
          </span>
        </Card.Text>

        {status === "pending" && (
          <div className="d-flex gap-2 mt-3">
            <Button variant="success" size="sm" onClick={() => onDecision(app._id, "accepted")}>
              Accept
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDecision(app._id, "rejected")}>
              Reject
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ApplicationReviewCard;
