import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const FloatingBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hidePaths = ['/', '/dashboard','/dashboard/admin'];
  if (hidePaths.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline-primary rounded-pill d-flex align-items-center gap-2 shadow"
      style={{
        position: 'fixed',
        top: '70px',
        left: '1rem',
        zIndex: 1050,
        backgroundColor: 'white',
        padding: '0.5rem 1.25rem',
        boxShadow: '0 4px 8px rgba(0, 123, 255, 0.15)',
        borderColor: '#2575fc',
        transition: 'all 0.2s ease',
        fontWeight: 600,
        cursor: 'pointer',
      }}
      aria-label="Go Back"
      tabIndex={0}
      aria-haspopup="false"
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#2575fc';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(37, 117, 252, 0.4)';
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.borderColor = '#1a4ed0';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.color = '#2575fc';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.15)';
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = '#2575fc';
      }}
    >
      <FaArrowLeft size={18} />
      <span style={{ fontSize: '1rem' }}>Back</span>
    </button>
  );
};

export default FloatingBackButton;
