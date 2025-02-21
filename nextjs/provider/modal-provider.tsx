"use client";

import { createContext, useContext, useState, ReactNode, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../components/layouts/modal";
type ModalContextType = {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && createPortal(<Modal onClose={closeModal}>{content}</Modal>, document.body)}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

