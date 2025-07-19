import React from 'react';
import { NavLink } from 'react-router-dom';

const ApplyButton = ({ projectId }) => (
  <NavLink
    to={`/applications/apply/${projectId}`}
    className="btn btn-sm btn-outline-success"
  >
    Apply Now
  </NavLink>
);

export default ApplyButton;
