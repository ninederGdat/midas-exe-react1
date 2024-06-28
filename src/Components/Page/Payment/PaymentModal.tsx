import React, { useState } from "react";
import Modal from "react-modal";

// Custom styles for the modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
  },
};

// Bind modal to the app element (for accessibility)
Modal.setAppElement("#root");

interface PaymentModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  url,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Payment QR Code"
    >
      <button onClick={onClose} style={{ float: "right", cursor: "pointer" }}>
        Close
      </button>
      <iframe src={url} width="100%" height="100%" title="Payment QR Code" />
    </Modal>
  );
};

export default PaymentModal;
