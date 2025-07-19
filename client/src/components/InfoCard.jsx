// components/InfoCard.jsx
import React from "react";
import { Card } from "react-bootstrap";

const InfoCard = ({ title, children }) => {
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        {title && <Card.Title className="mb-3">{title}</Card.Title>}
        {children}
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
