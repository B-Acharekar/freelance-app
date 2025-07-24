import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { deleteProject } from '../services/projectService';
import { useAuth } from '../context/AuthContext';

const DeleteProjectButton = ({ projectId, onDelete }) => {
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteProject(projectId, token);
      showToast("success", "Project deleted successfully.");
      setDeleting(false);
      setShow(false);
      if (onDelete) onDelete(projectId);
    } catch (err) {
      console.error('Delete failed', err);
      showToast("error", "Failed to delete project.");
      setDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        className="hover:bg-danger rounded-pill me-2 hover:bg-red-600 text-red-600 hover:text-white"
        onClick={() => setShow(true)}
      >
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this project? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting} className='hover:bg-danger'>
            {deleting ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProjectButton;
