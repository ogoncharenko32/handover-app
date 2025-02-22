import clsx from "clsx";
import React from "react";
import css from "./ConfirmModal.module.css";

import Modal from "react-modal";

const ComfirmModal = ({ isOpen, onClose, mode, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      bodyOpenClassName="no-scroll"
      className={clsx(css.modal)}
      overlayClassName={clsx(css.customOverlay)}
    >
      <div className={clsx(css.wrapper)}>
        <p>Are you sure you want to {mode}?</p>
        <div className={clsx(css.btnWrapper)}>
          <button onClick={onClose} type="button" className={clsx(css.button)}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className={clsx(css.button, css.redButton)}
          >
            {mode}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ComfirmModal;
