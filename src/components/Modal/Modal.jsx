import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children, onCloseModal }) {
  const { Overlay, Modal } = css;

  useEffect(() => {
    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  });

  return createPortal(
    <div className={Overlay} onClick={onCloseModal}>
      <div className={Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};
