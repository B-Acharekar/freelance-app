import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hidePaths = ['/', '/dashboard', '/dashboard/admin', '/login', '/register'];
  if (hidePaths.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="position-fixed d-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary fw-semibold"
      style={{
        top: '70px',
        left: '1rem',
        zIndex: 1050,
        backgroundColor: '#ffffff',
        color: '#2575fc',
        borderColor: '#2575fc',
        boxShadow: '0 4px 12px rgba(37, 117, 252, 0.15)',
        transition: 'all 0.25s ease-in-out',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2575fc';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 117, 252, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.color = '#2575fc';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 117, 252, 0.15)';
      }}
      aria-label="Go Back"
    >
      <FaArrowLeft size={16} />
      <span className="d-none d-sm-inline">Back</span>
    </button>
  );
};

export default FloatingBackButton;
