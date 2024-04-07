import { cloneElement, useContext } from "react";
import { ModalContext } from "./Modal";

const ModalOpen = ({ children, open }) => {
	const { openWindow } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => openWindow(open) });
};

export default ModalOpen;
