import toast, { Toaster } from 'react-hot-toast';
import { FaTimes, FaCheckCircle, FaExclamationCircle,FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.75rem',
  padding: '0.75rem 1rem',
  borderRadius: '0.5rem',
  minWidth: '300px',
  maxWidth: '400px',
  backgroundColor: '#fdfcfb', // Off-white / creamy
  color: '#2d2d2d',
  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  borderLeft: '4px solid',
  fontFamily: `'Inter', sans-serif`,
};

const typeStyles = {
  success: {
    icon: <FaCheckCircle color="#16a34a" />, // Slightly deeper green
    borderColor: '#16a34a',
  },
  error: {
    icon: <FaExclamationCircle color="#dc2626" />, // Slightly deeper red
    borderColor: '#dc2626',
  },
  info: {
    icon: <FaInfoCircle color="#2563eb" />, // Slightly deeper blue
    borderColor: '#2563eb',
  },
  warning: {
    icon: <FaExclamationTriangle color="#f59e0b"/> ,// Amber / yellow-ish
   borderColor : '#f59e0b',
  },
};

export const showToast = (type, message) => {
  return toast.custom((t) => {
    const visibleClass = t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2';
    const style = {
      ...baseStyle,
      borderColor: typeStyles[type]?.borderColor || '#2563eb',
    };
    const icon = typeStyles[type]?.icon || typeStyles.info.icon;

    return (
      <div
        className={`transition-all duration-300 ease-in-out ${visibleClass}`}
        style={style}
      >
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          {icon}
          <div>{message}</div>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            fontSize: '1.1rem',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          <FaTimes />
        </button>
      </div>
    );
  });
};
