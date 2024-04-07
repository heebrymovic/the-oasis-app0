import styled from "styled-components";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { CreateCabinForm } from "./";
import { useDeleteCabin, useCreateCabin } from "./hooks";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 20px 30px;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const [editCabin, setEditCabin] = useState(false);

  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  const { isDeleting, deletingCabin } = useDeleteCabin();

  const { creatingCabin, isSubmitting } = useCreateCabin();

  const handleDuplicateCabin = () => {
    creatingCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  };

  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits Up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{+discount > 0 ? formatCurrency(discount) : "-"}</Discount>
        <ButtonGroup>
          <Button onClick={() => setEditCabin((open) => !open)}>
            {editCabin ? "Close" : "Edit"}
          </Button>
          <Button
            onClick={() => deletingCabin(id)}
            disabled={isDeleting}
            variation="danger"
          >
            Delete
          </Button>

          <Button disabled={isSubmitting} onClick={handleDuplicateCabin}>
            Duplicate
          </Button>
        </ButtonGroup>
      </TableRow>
      {editCabin && (
        <CreateCabinForm cabinValues={cabin} setEditCabin={setEditCabin} />
      )}
    </>
  );
};

export default CabinRow;
