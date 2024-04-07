import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { CreateCabinForm } from "./";
import { useDeleteCabin, useCreateCabin } from "./hooks";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { HiDuplicate, HiDotsVertical } from "react-icons/hi";

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
  /* const [editCabin, setEditCabin] = useState(false);*/

  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  const { isDeleting, deletingCabin } = useDeleteCabin();

  const { creatingCabin } = useCreateCabin();

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
      <Table.Row columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits Up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{+discount > 0 ? formatCurrency(discount) : "-"}</Discount>

        <Modal>
          <>
            <Menus.Menu>
              <Menus.Toggle id={id} Icon={<HiDotsVertical />} />

              <Menus.List id={id}>
                <Menus.Button
                  onClick={handleDuplicateCabin}
                  icon={<HiDuplicate />}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open open="edit">
                  <Menus.Button icon={<MdModeEdit />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open open="delete">
                  <Menus.Button icon={<MdDelete />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </>

          <>
            <Modal.Window name="edit" modalTitle="Edit Cabin">
              <CreateCabinForm cabinValues={cabin} />
            </Modal.Window>
            <Modal.Window
              name="delete"
              modalTitle="Delete Cabin"
              isPerfomingAction={isDeleting}
            >
              <ConfirmDelete
                resourceName={name}
                disabled={isDeleting}
                onConfirm={() => deletingCabin(id)}
              />
            </Modal.Window>
          </>
        </Modal>
      </Table.Row>
    </>
  );
};

export default CabinRow;
