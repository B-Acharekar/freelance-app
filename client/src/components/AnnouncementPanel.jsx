import React, { useEffect, useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import {
  getSystemAnnouncement,
  setSystemAnnouncement,
  clearSystemAnnouncement
} from '../services/adminService';
import { FiVolume2, FiXCircle } from 'react-icons/fi';

const AnnouncementPanel = () => {
  const [message, setMessage] = useState('');
  const [current, setCurrent] = useState(null);

  const fetchCurrent = async () => {
    const data = await getSystemAnnouncement();
    setCurrent(data?.message || '');
  };

  useEffect(() => {
    fetchCurrent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await setSystemAnnouncement(message.trim());
    setMessage('');
    fetchCurrent();
  };

  const handleClear = async () => {
    await clearSystemAnnouncement();
    setCurrent('');
  };

  return (
    <Card className="shadow-sm rounded-4 p-4 mb-4">
      <h5 className="mb-3 fw-bold d-flex align-items-center gap-2">
        <FiVolume2 size={20} />
        System Announcement
      </h5>

      {current && (
        <Card className="mb-3 bg-light border-0">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div className="text-secondary">
              <strong>Current:</strong> {current}
            </div>
            <Button variant="link" className="text-danger p-0" onClick={handleClear}>
              <FiXCircle size={18} />
            </Button>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter system announcement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-start"
            />
            <Button type="submit" variant="primary" className="rounded-end px-4">
              Announce
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default AnnouncementPanel;
