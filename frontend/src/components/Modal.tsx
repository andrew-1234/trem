import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: '' }}>
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      <div className="modal-body">
        {children}
      </div>
    </div>
  );
};

export default Modal;