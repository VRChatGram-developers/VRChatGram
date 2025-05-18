"use client";

import { ReactNode } from "react";
import styles from "../styles/modal.module.scss";
import Modal from "react-modal"

type ReactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

Modal.setAppElement(".hogehoge")

export const ReactModal = ({
  reactModalProps,
}: {
  reactModalProps: ReactModalProps;
}) => {
  return (
    <Modal
      isOpen={reactModalProps.isOpen}
      onRequestClose={reactModalProps.onClose}
      style={styles}
    >
      <div className={styles.modalContainer} onClick={reactModalProps.onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {reactModalProps.children}
        </div>
      </div>
    </Modal>
  );
};
