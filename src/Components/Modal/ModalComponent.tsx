import React, { FC } from "react";
import "./Modal.css";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: () => void;
  children: React.ReactNode; // Define the children prop
}

const Modal: FC<ModalProps> = ({ show, handleClose, handleSave, children }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {children}
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-success" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
