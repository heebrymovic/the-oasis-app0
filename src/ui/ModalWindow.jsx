import { createPortal } from "react-dom";
import { useContext, cloneElement } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { ModalContext } from "./Modal";
import { useModalClose } from "../hooks/useModalClose";

const StyledModal = styled.div`
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem 4rem;
  transition: all 0.5s;
  margin: 20px 0;

  @media (max-width: 768px) {
    margin: 10px;
    padding-inline: 25px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  display: grid;
  place-items: center;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-grey-200);
  padding-bottom: 5px;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalWindow = ({ children, name, modalTitle, isPerfomingAction }) => {
  const { openName, closeWindow } = useContext(ModalContext);

  const ref = useModalClose(closeWindow, isPerfomingAction);

  if (openName !== name) return null;

  return createPortal(
    <Overlay ref={ref} id="overlay">
      <StyledModal>
        <ModalHeader>
          <ModalTitle>{modalTitle}</ModalTitle>
          <Button onClick={closeWindow}>
            <MdClose />
          </Button>
        </ModalHeader>
        <div>{cloneElement(children, { onCloseModal: closeWindow })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

export default ModalWindow;
