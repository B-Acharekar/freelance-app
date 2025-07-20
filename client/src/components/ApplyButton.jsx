import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

const ApplyButton = ({ projectId }) => (
  <NavLink
    to={`/applications/apply/${projectId}`}
    className="btn btn-sm btn-outline-success d-flex align-items-center gap-2 px-3 py-2 shadow-sm rounded-pill transition-all"
    style={{ fontWeight: 500 }}
  >
    <FaPaperPlane size={14} />
    Apply Now
  </NavLink>
);

export default ApplyButton;
