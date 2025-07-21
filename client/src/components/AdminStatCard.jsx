import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUsers, FaClipboardList, FaCheckCircle, FaProjectDiagram } from 'react-icons/fa';

const iconMap = {
  users: <FaUsers size={32} className="text-primary mb-2" />,
  activeUsers: <FaCheckCircle size={32} className="text-success mb-2" />,
  projects: <FaProjectDiagram size={32} className="text-warning mb-2" />,
  applications: <FaClipboardList size={32} className="text-info mb-2" />,
};

const AdminStatCard = ({ type, count, label }) => {
  return (
    <Card className="shadow-sm p-4 border-0 rounded-5 text-center h-100 bg-light">
      <div>{iconMap[type]}</div>
      <h4 className="fw-semibold mt-2">{count}</h4>
      <p className="text-muted mb-0 small">{label}</p>
    </Card>
  );
};

export default AdminStatCard;
