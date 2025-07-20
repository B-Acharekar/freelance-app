import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import {
  FaMoneyBill,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaUserTie,
  FaEnvelope,
  FaUserCheck,
  FaTimesCircle,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { NavLink } from 'react-router-dom';

const ApplicationReviewCard = ({ app, onAccept, onReject }) => {
  if (!app) return null;

  const {
    _id: applicationId,
    status,
    projectTitle,
    bidAmount,
    coverLetter,
    portfolioLink,
    createdAt,
    freelancerId,
  } = app;

  const freelancerName =
    typeof freelancerId === 'object' ? freelancerId.name : 'Freelancer';
  const freelancerEmail =
    typeof freelancerId === 'object' ? freelancerId.email : '';
  const freelancerIdValue =
    typeof freelancerId === 'object' ? freelancerId._id : freelancerId;

  const statusColor = {
    accepted: 'success',
    rejected: 'danger',
    pending: 'secondary',
  };

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4 px-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-bold text-primary">{projectTitle}</h5>
          <Badge bg={statusColor[status]} className="text-capitalize px-3 py-1 fs-6">
            {status}
          </Badge>
        </div>

        <p className="text-muted mb-3">
          <FaCalendarAlt className="me-2 text-secondary" />
          Applied {formatDistanceToNow(new Date(createdAt))} ago
        </p>

        <div className="mb-3">
          <strong className="d-block mb-1 text-dark">
            <FaMoneyBill className="me-2 text-success" />
            Bid Amount:
          </strong>
          <span className="fs-5 fw-semibold">${bidAmount}</span>
        </div>

        <div className="mb-3">
          <strong className="d-block mb-1 text-dark">
            <FaUserTie className="me-2 text-info" />
            Freelancer:
          </strong>
          <span className="fw-semibold">{freelancerName}</span>
          <br />
          <FaEnvelope className="me-2 text-muted" />
          <small className="text-muted">{freelancerEmail}</small>
        </div>

        <div className="mb-3">
          <strong className="d-block mb-2 text-dark">Cover Letter:</strong>
          <p className="text-body">{coverLetter}</p>
        </div>

        {portfolioLink && (
          <div className="mb-3">
            <a
              href={portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark btn-sm rounded-pill"
            >
              View Portfolio <FaExternalLinkAlt className="ms-1" />
            </a>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex gap-2">
            {status === 'pending' && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  className="rounded-pill d-flex align-items-center"
                  onClick={() => onAccept(applicationId)}
                >
                  <FaUserCheck className="me-1" /> Accept
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill d-flex align-items-center"
                  onClick={() => onReject(applicationId)}
                >
                  <FaTimesCircle className="me-1" /> Reject
                </Button>
              </>
            )}
          </div>

          <NavLink
            to={`/freelancer/${freelancerIdValue}`}
            className="btn btn-outline-primary btn-sm rounded-pill"
          >
            View Profile
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ApplicationReviewCard;
