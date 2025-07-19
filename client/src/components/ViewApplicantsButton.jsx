import React from 'react';
import { NavLink } from 'react-router-dom';

const ViewApplicantsButton = ({ projectId }) => (
  <NavLink
    to={`/applications/project/${projectId}`}
    className="btn btn-sm btn-outline-primary"
  >
    View Applicants
  </NavLink>
);

export default ViewApplicantsButton;
