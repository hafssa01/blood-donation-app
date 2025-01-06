import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ProfileCard = ({ user }) => {
  return (
    <Card className="text-center shadow-sm" style={{ borderRadius: '20px' }}>
      <Card.Body>
        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Location:</strong> {user.location}</ListGroup.Item>
          <ListGroup.Item><strong>Phone:</strong> {user.phone}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;