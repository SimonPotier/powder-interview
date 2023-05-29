/**
 * * Clip modal: handle clips modal interactions
 */

import { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  onClose: () => void;
}

const ClipModal: React.FC<ModalProps> = ({ isOpen, onClose, title, body }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default ClipModal;
