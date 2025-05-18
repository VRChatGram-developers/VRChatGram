"use client";

import { ReactNode } from "react";
import styles from "../styles/modal.module.scss";
import Modal from "react-modal";
import { useState, useEffect } from "react";

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

// Modal.setAppElement("#modal-root");
export const CommonModal = ({ modalProps }: { modalProps: CommonModalProps }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = document.querySelector("#modal-root");
    if (el instanceof HTMLElement) {
      setModalRoot(el);
    }
  }, []);
  return (
    <Modal
      isOpen={modalProps.isOpen}
      onRequestClose={modalProps.onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      appElement={modalRoot as HTMLElement}
    >
      <div className={styles.modalContainer} onClick={modalProps.onClose}>
        <div onClick={(e) => e.stopPropagation()}>{modalProps.children}</div>
      </div>
    </Modal>
  );
};
