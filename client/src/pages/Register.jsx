import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </Form.Group>
        <Button type="submit" variant="success">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;
