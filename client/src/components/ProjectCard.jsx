import React from 'react';
import { FaMoneyBillWave, FaTools, FaUserTie, FaComments } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const ProjectCard = ({ project, role }) => {
  const { title, description, budget, skillsRequired, clientId, _id } = project;

  return (
    <div
      className="bg-white border border-light-subtle shadow-sm rounded-4 h-100 p-3"
      style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 1rem 1.5rem rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.05)';
      }}
    >
      <div className="d-flex flex-column gap-3 h-100">
        {/* Title */}
        <h5 className="fw-bold text-dark mb-0">{title}</h5>

        {/* Description */}
        <p
          className="text-muted small mb-0"
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

        {/* Budget */}
        <div className="d-flex align-items-center gap-2 text-success small">
          <FaMoneyBillWave />
          <span className="fw-semibold">Budget: ₹{budget}</span>
        </div>

        {/* Skills */}
        {skillsRequired?.length > 0 && (
          <div className="d-flex flex-wrap align-items-center gap-2 mt-1">
            <FaTools className="text-primary" />
            <strong className="text-dark me-2 small">Skills:</strong>
            {skillsRequired.map((skill, idx) => (
              <span
                key={idx}
                className="badge bg-light text-primary border border-primary rounded-pill px-2 py-1"
                style={{ fontSize: '0.72rem' }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Posted By */}
        <div className="border-top pt-3 mt-2 text-muted d-flex align-items-center gap-2 small">
          <FaUserTie className="text-secondary" />
          <span>
            <em>
              Posted by <strong>{clientId?.name}</strong> ({clientId?.email})
            </em>
          </span>
        </div>

        {/* CTA */}
        <div className="d-flex flex-wrap justify-content-end gap-2 pt-2 mt-auto">
          {role === 'freelancer' && (
            <>
              <NavLink
                to={`/applications/apply/${_id}`}
                className="btn btn-sm btn-outline-success rounded-pill fw-semibold px-3"
              >
                Apply Now
              </NavLink>
              <NavLink
                to={`/projects/${_id}/message/${clientId?._id}`}
                className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-2 fw-semibold px-3"
              >
                <FaComments size={14} /> Message
              </NavLink>
            </>
          )}
          {role === 'client' && (
            <NavLink
              to={`/applications/project/${_id}`}
              className="btn btn-sm btn-outline-primary rounded-pill fw-semibold px-3"
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
