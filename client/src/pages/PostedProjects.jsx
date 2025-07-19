import React, { useEffect, useState } from 'react';
import { getPostedProjects } from '../services/projectService'; // assumes API to get projects by current client
import { NavLink } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

const PostedProjects = () => {
    const [postedProjects, setPostedProjects] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await getPostedProjects(token)
; // should return projects posted by logged-in client
                setPostedProjects(res.data);
            } catch (err) {
                console.error("Failed to load posted projects", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Your Posted Projects</h2>
            {postedProjects.length === 0 ? (
                <p>No projects posted yet.</p>
            ) : (
                postedProjects.map(project => (
                    <Card key={project._id} className="mb-3 shadow-sm">
                        <Card.Body>
                            <Card.Title>{project.title}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            {/* 👇 View Applicants button with dynamic link */}
                            <NavLink
                                className="btn btn-sm btn-outline-primary"
                                to={`/applications/project/${project._id}`}
                            >
                                View Applicants
                            </NavLink>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default PostedProjects;
