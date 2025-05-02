import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ErrorModel.css';

interface ErrorModalProps {
  show: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, onClose, errorMessage }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="error">
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
