import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const ViewApplicantsButton = ({ projectId }) => (
  <NavLink
    to={`/applications/project/${projectId}`}
    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3 rounded-pill shadow-sm"
    title="View applicants for this project"
  >
    <FaUsers size={14} />
    <span className="fw-semibold">Applicants</span>
  </NavLink>
);

export default ViewApplicantsButton;
