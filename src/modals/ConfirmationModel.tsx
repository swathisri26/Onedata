import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalStyles.css';

interface Props {
  show: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ConfirmationModal: React.FC<Props> = ({ show, onClose, jobTitle }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="success">
        <Modal.Title>Application Submitted</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have successfully applied for <strong>{jobTitle}</strong>.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
