import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteNoteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ show, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this note? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteNoteModal;