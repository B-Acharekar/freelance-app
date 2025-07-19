import React from 'react';
import { FaMoneyBillWave, FaTools, FaUserTie, FaComments, FaIdBadge } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ProjectCard = ({ project, role, currentUserId }) => {
  const { title, description, budget, skillsRequired, clientId, _id } = project;

  return (
    <div className="card shadow-sm h-100 border-0 rounded-4 mb-4">
      <div className="card-body">
        <h5 className="card-title fw-bold text-dark">{title}</h5>
        <p className="card-text text-muted">{description}</p>

        <ul className="list-unstyled mt-3 mb-0">
          <li className="mb-2">
            <FaMoneyBillWave className="me-2 text-success" />
            <strong>Budget:</strong> ₹{budget}
          </li>
          <li className="mb-2">
            <FaTools className="me-2 text-primary" />
            <strong>Skills:</strong> {skillsRequired?.join(', ')}
          </li>
          <li className="text-muted small">
            <FaUserTie className="me-2" />
            <strong>Posted by:</strong> {clientId?.name} ({clientId?.email})
          </li>
        </ul>

        <div className="mt-4 d-flex gap-2 flex-wrap justify-content-end">
          {role === 'freelancer' && (
            <>
              <NavLink
                to={`/applications/apply/${_id}`}
                className="btn btn-sm btn-outline-success rounded-pill"
              >
                Apply Now
              </NavLink>

              <NavLink
                to={`/chatroom/${clientId?._id}/${_id}`}
                className="btn btn-sm btn-outline-dark rounded-pill"
              >
                <FaComments className="me-1" /> Message Client
              </NavLink>

              <NavLink
                to={`/profile/${clientId?._id}`}
                className="btn btn-sm btn-outline-secondary rounded-pill"
              >
                <FaIdBadge className="me-1" /> View Profile
              </NavLink>
            </>
          )}

          {role === 'client' && (
            <NavLink
              to={`/applications/project/${_id}`}
              className="btn btn-sm btn-outline-primary rounded-pill"
            >
              View Applicants
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
