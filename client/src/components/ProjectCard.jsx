import React from 'react';
import { FaMoneyBillWave, FaTools, FaUserTie, FaComments } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ProjectCard = ({ project, role }) => {
  const { title, description, budget, skillsRequired, clientId, _id } = project;

  return (
    <div
      className="card shadow-sm border-0 rounded-4 mb-4 h-100"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 1rem 1.5rem rgba(37,117,252,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.1)';
      }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark" style={{ minHeight: '3.5rem' }}>
          {title}
        </h5>
        <p
          className="card-text text-muted flex-grow-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={description}
        >
          {description}
        </p>

        <ul className="list-unstyled mt-3 mb-3">
          <li className="mb-2 d-flex align-items-center">
            <FaMoneyBillWave className="me-2 text-success fs-5 flex-shrink-0" />
            <strong>Budget:</strong> ₹{budget}
          </li>
          <li className="mb-3 d-flex align-items-center flex-wrap gap-2">
            <FaTools className="me-2 text-primary fs-5 flex-shrink-0" />
            <strong className="me-2">Skills:</strong>
            {skillsRequired?.map((skill, idx) => (
              <span
                key={idx}
                className="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-semibold"
                style={{ fontSize: '0.8rem' }}
                title={skill}
              >
                {skill}
              </span>
            ))}
          </li>
          <li
            className="text-muted small border-top pt-2 mt-3 d-flex align-items-center gap-2"
            style={{ fontStyle: 'italic' }}
            title={`${clientId?.name} (${clientId?.email})`}
          >
            <FaUserTie className="flex-shrink-0" />
            <span>
              Posted by: <strong>{clientId?.name}</strong> ({clientId?.email})
            </span>
          </li>
        </ul>

        <div className="mt-auto d-flex gap-2 flex-wrap justify-content-end">
          {role === 'freelancer' && (
            <>
              <NavLink
                to={`/applications/apply/${_id}`}
                className="btn btn-sm btn-outline-success rounded-pill px-4 py-2 fw-semibold shadow-sm"
              >
                Apply Now
              </NavLink>

              <NavLink
                to={`/chatroom/${clientId?._id}/${_id}`}
                className="btn btn-sm btn-outline-dark rounded-pill px-3 py-2 d-flex align-items-center gap-1 shadow-sm fw-semibold"
              >
                <FaComments /> Message Client
              </NavLink>
            </>
          )}

          {role === 'client' && (
            <NavLink
              to={`/applications/project/${_id}`}
              className="btn btn-sm btn-outline-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
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
