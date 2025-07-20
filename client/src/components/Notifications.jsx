import React, { useState } from 'react';

export default function Notifications() {
  // Dummy notifications: some for freelancers, some for clients
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      userType: 'freelancer',
      status: 'accepted',
      projectName: 'Website Redesign',
      read: false,
    },
    {
      id: 'n2',
      userType: 'freelancer',
      status: 'rejected',
      projectName: 'Mobile App Development',
      read: false,
    },
    {
      id: 'n3',
      userType: 'freelancer',
      status: 'under review',
      projectName: 'Logo Design',
      read: true,
    },
    {
      id: 'n4',
      userType: 'client',
      status: 'new application',
      projectName: 'SEO Optimization',
      read: false,
    },
    {
      id: 'n5',
      userType: 'client',
      status: 'multi-accept warning',
      projectName: 'Mobile App',
      read: true,
    },
  ]);

  // Function to generate notification message based on userType and status
  const getNotificationMessage = ({ userType, status, projectName }) => {
    if (userType === 'freelancer') {
      switch (status) {
        case 'accepted':
          return `✅ You’re hired for ${projectName}.`;
        case 'rejected':
          return `❌ Not selected for ${projectName}.`;
        case 'pending':
        case 'under review':
          return `⏳ Application under review for ${projectName}.`;
        default:
          return '';
      }
    } else if (userType === 'client') {
      switch (status) {
        case 'new application':
          return `New applicant for ${projectName}.`;
        case 'multi-accept warning':
          return `Freelancer already accepted. Allow multiple?`;
        default:
          return '';
      }
    }
    return '';
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <div className="list-group">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              type="button"
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                notif.read ? 'bg-light' : 'bg-info text-white'
              }`}
              onClick={() => markAsRead(notif.id)}
              style={{ cursor: 'pointer' }}
              title="Click to mark as read"
            >
              <div>{getNotificationMessage(notif)}</div>
              {!notif.read && <span className="badge bg-warning">New</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
