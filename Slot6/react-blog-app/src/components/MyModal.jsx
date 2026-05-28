import React from 'react';
import { Modal } from 'react-bootstrap';

function MyModal({ show, onHide, title, children, footer, size = 'lg' }) {
  return (
    <Modal show={show} onHide={onHide} centered size={size} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
}

export default MyModal;
