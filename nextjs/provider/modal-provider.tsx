"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react";
import { CommonModal } from "../components/layouts/common-modal";

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
    (document.activeElement as HTMLElement)?.blur();

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
      <CommonModal
        modalProps={{
          isOpen: isOpen,
          onClose: closeModal,
          children: content,
        }}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
