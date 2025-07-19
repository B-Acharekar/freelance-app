import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFreelancerProfile, updateFreelancerProfile } from '../services/freelancerService';

const Profile = () => {
  const { id: userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getFreelancerProfile(userId);
      setProfile(data);
      setForm(data);
    };
    fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    await updateFreelancerProfile(userId, form);
    setEditMode(false);
    setProfile(form);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      <div className="card p-3 shadow-sm bg-light">
        {editMode ? (
          <>
            <input className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="form-control mb-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="form-control mb-2" value={form.skills.join(', ')} onChange={(e) => setForm({ ...form, skills: e.target.value.split(',') })} />
            <input className="form-control mb-2" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            <textarea className="form-control mb-2" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}></textarea>
            <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
            <p><strong>Experience:</strong> {profile.experience}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;