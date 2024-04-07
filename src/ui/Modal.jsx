import { createContext, useState } from "react";
import ModalWindow from "./ModalWindow";
import ModalOpen from "./ModalOpen";

export const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const closeWindow = () => setOpenName("");
  const openWindow = setOpenName;

  return (
    <ModalContext.Provider value={{ closeWindow, openWindow, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = ModalOpen;
Modal.Window = ModalWindow;

export default Modal;
