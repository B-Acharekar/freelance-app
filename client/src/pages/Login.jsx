import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { loginUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            console.log("Login Response:", res.data);//Debug
            login(res.data.user.name, res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </Form.Group>
                <Button type="submit" variant="primary">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
