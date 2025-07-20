import React, { useState } from 'react';

function AdminDashboard() {
  // Dummy data
  const [users, setUsers] = useState([
    { _id: '1', name: 'Alice', email: 'alice@example.com', role: 'user', status: 'active' },
    { _id: '2', name: 'Bob', email: 'bob@example.com', role: 'admin', status: 'active' },
    { _id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'user', status: 'suspended' },
  ]);

  const [projects] = useState([
    { id: 'p1', title: 'Build Landing Page', owner: 'Alice', status: 'ongoing' },
    { id: 'p2', title: 'Mobile App Design', owner: 'Bob', status: 'completed' },
    { id: 'p3', title: 'Backend API', owner: 'Charlie', status: 'ongoing' },
  ]);

  const [newsletters] = useState([
    { id: 'n1', title: 'Weekly Update', sentDate: '2025-07-10', subscribers: 500 },
    { id: 'n2', title: 'Product Launch', sentDate: '2025-06-25', subscribers: 480 },
  ]);

  const [activityLogs] = useState([
    { id: 'a1', activity: 'Alice logged in', date: '2025-07-19 10:30 AM' },
    { id: 'a2', activity: 'Bob created a new project', date: '2025-07-19 9:15 AM' },
    { id: 'a3', activity: 'Charlie suspended', date: '2025-07-18 4:50 PM' },
    { id: 'a4', activity: 'Newsletter sent to 500 subscribers', date: '2025-07-17 12:00 PM' },
  ]);

  // State for user actions
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  // Handlers
  const openConfirm = (action, user) => {
    setConfirmAction(action);
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (confirmAction === 'delete') {
      setUsers(users.filter((u) => u._id !== selectedUser._id));
    } else if (confirmAction === 'toggleStatus') {
      setUsers(users.map(u =>
        u._id === selectedUser._id
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      ));
    }
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setEditUserData({...user});
    setShowEditModal(true);
  };

  const saveEdit = () => {
    setUsers(users.map(u => u._id === editUserData._id ? editUserData : u));
    setShowEditModal(false);
    setEditUserData(null);
  };

  // Summary stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalProjects = projects.length;
  const totalNewsletters = newsletters.length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-3">{totalUsers}</p>
              <small>Active: {activeUsers}</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Projects</h5>
              <p className="card-text fs-3">{totalProjects}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Newsletters Sent</h5>
              <p className="card-text fs-3">{totalNewsletters}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <p className="card-text fs-3">{activityLogs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <h3 className="mb-3">Users Management</h3>
      <div className="row mb-5">
        {users.map(user => (
          <div className="col-md-4 mb-3" key={user._id}>
            <div className={`card ${user.status === 'active' ? '' : 'border-warning'}`}>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p>
                  <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'secondary'} me-2`}>
                    {user.role}
                  </span>
                  <span className={`badge bg-${user.status === 'active' ? 'success' : 'warning'}`}>
                    {user.status}
                  </span>
                </p>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(user)}>Edit</button>
                <button
                  className={`btn btn-sm me-2 ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => openConfirm('toggleStatus', user)}
                >
                  {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => openConfirm('delete', user)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <h3 className="mb-3">Projects</h3>
      <div className="row mb-5">
        {projects.map(proj => (
          <div className="col-md-4 mb-3" key={proj.id}>
            <div className="card border-info">
              <div className="card-body">
                <h5 className="card-title">{proj.title}</h5>
                <p className="card-text">Owner: {proj.owner}</p>
                <span className={`badge bg-${proj.status === 'completed' ? 'success' : 'primary'}`}>
                  {proj.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletters Section */}
      <h3 className="mb-3">Newsletters</h3>
      <div className="row mb-5">
        {newsletters.map(nl => (
          <div className="col-md-6 mb-3" key={nl.id}>
            <div className="card border-info">
              <div className="card-body">
                <h5 className="card-title">{nl.title}</h5>
                <p className="card-text">Sent Date: {nl.sentDate}</p>
                <p className="card-text">Subscribers: {nl.subscribers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Logs */}
      <h3 className="mb-3">Activity Logs</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {activityLogs.map(log => (
          <div key={log.id} className="alert alert-light border mb-2">
            <small>{log.date}</small>
            <p className="mb-0">{log.activity}</p>
          </div>
        ))}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm {confirmAction === 'delete' ? 'Delete' : 'Status Change'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                {confirmAction === 'delete' && (
                  <p>Are you sure you want to delete user <strong>{selectedUser.name}</strong>?</p>
                )}
                {confirmAction === 'toggleStatus' && (
                  <p>Are you sure you want to {selectedUser.status === 'active' ? 'suspend' : 'reactivate'} user <strong>{selectedUser.name}</strong>?</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editUserData && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editUserData.name}
                    onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editUserData.email}
                    onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={editUserData.role}
                    onChange={(e) => setEditUserData({...editUserData, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={saveEdit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
