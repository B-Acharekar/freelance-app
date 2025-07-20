import React from "react";
import { Card } from "react-bootstrap";

const InfoCard = ({ title, children }) => {
  return (
    <Card
      className="mb-4 shadow-sm border-0 rounded-4"
      style={{
        background: "white",
        transition: "box-shadow 0.3s ease",
        padding: "1.5rem",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 0.75rem 1.5rem rgba(0, 123, 255, 0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 0.125rem 0.25rem rgba(0,0,0,0.1)")
      }
    >
      <Card.Body className="p-0">
        {title && (
          <Card.Title
            className="mb-4 fw-bold"
            style={{
              fontSize: "1.75rem",
              letterSpacing: "0.05em",
              borderBottom: "3px solid #2575fc",
              paddingBottom: "0.4rem",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Card.Title>
        )}
        {children}
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
