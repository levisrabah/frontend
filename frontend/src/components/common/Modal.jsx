import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../../css/Modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  footer,
  ...props
}) => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      modalContentRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      ref={modalRef}
      className="mdl-overlay"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      {...props}
    >
      <div
        ref={modalContentRef}
        className={`mdl-content mdl-${size} ${className}`}
        tabIndex="-1"
      >
        <div className="mdl-header">
          {title && <h2 className="mdl-title">{title}</h2>}
          {showCloseButton && (
            <button
              className="mdl-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mdl-body">
          {children}
        </div>

        {footer && <div className="mdl-footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;