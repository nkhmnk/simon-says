import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, children }) => {
  // Якщо модальне вікно не відкрите, нічого не рендеримо
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        {children}
      </div>
    </div>,
    document.body // Рендеримо модалку як прямого нащадка body
  );
};

export default Modal;