import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { deleteMyApplication } from '../services/applicationService';
import { useAuth } from '../context/AuthContext';

const DeleteApplicationButton = ({ applicationId, onDelete }) => {
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { token } = useAuth();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteMyApplication(applicationId, token);
      showToast("success", "Application deleted successfully.");
      setDeleting(false);
      setShow(false);
      if (onDelete) onDelete(applicationId);
    } catch (err) {
      console.error('Delete application failed', err);
      showToast("error", "Failed to delete application.");
      setDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        className="rounded-pill me-2"
        onClick={() => setShow(true)}
      >
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this application? This cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? <Spinner animation="border" size="sm" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteApplicationButton;
