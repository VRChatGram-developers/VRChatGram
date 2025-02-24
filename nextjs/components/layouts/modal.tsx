"use client";

import { ReactNode } from "react";
import styles from "../styles/modal.module.scss";
export const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};
