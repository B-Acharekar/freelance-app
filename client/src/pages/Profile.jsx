import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { getUserProfile, updateFreelancerProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    skills: "",
    experience: "",
    bio: "",
  });

  const { user, role, token } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !token) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data);
        if (data.role === "freelancer") {
          setFormData({
            skills: data.skills?.join(", ") || "",
            experience: data.experience || "",
            bio: data.bio || "",
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile", err.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        experience: formData.experience,
        bio: formData.bio,
      };

      const updated = await updateFreelancerProfile(userId, payload, token);
      setProfile((prev) => ({ ...prev, ...updated }));
      setEditing(false);
    } catch (err) {
      console.error("Error updating freelancer profile", err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!profile) {
    return <Container className="mt-5"><p>Error loading profile</p></Container>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">My Profile</h2>
      <Card className="p-4 shadow-sm border-0 rounded-4">
        <Row>
          <Col md={6}>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </Col>

          {role === "freelancer" && (
            <Col md={6}>
              {!editing ? (
                <>
                  <p><strong>Skills:</strong> {profile.skills?.join(", ") || "Not set"}</p>
                  <p><strong>Experience:</strong> {profile.experience || "Not set"}</p>
                  <p><strong>Bio:</strong> {profile.bio || "Not set"}</p>
                  <Button variant="outline-primary" onClick={() => setEditing(true)}>
                    Edit Freelancer Info
                  </Button>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="skills">
                    <Form.Label>Skills (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      name="skills"
                      value={formData.skills}
                      placeholder="e.g. React, Node.js, MongoDB"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="text"
                      name="experience"
                      value={formData.experience}
                      placeholder="e.g. 3 years in full-stack development"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="bio"
                      value={formData.bio}
                      placeholder="Tell us a bit about yourself"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="success">Save</Button>
                    <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                  </div>
                </Form>
              )}
            </Col>
          )}
        </Row>
      </Card>
    </Container>
  );
};

export default Profile;
