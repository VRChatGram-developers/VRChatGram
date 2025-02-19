"use client";

import { ReactNode } from "react";
import styles from "../styles/modal.module.scss";
export const Modal = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className="relative inline-block origin-top-left rounded-lg bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
