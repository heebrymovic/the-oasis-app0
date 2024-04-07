import styled from "styled-components";
import { useContext } from "react";
import { ModalContext } from "./Modal";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled }) {
  const { closeWindow } = useContext(ModalContext);

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this <b>{resourceName}</b> permanently?
        This action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={closeWindow} disabled={disabled}>
          Cancel
        </Button>
        <Button variation="danger" onClick={onConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
