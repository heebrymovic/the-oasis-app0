import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { useBooking } from "./hooks";
import BookingDataBox from "./BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useDeleteBooking } from "./hooks";
import { useCheckout } from "../checkinout/hooks";
import { useMoveBack } from "../../hooks/useMoveBack";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const BookingDetail = () => {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const { isLoadingBooking, booking } = useBooking();

  const { deleteBooking, isDeletingBooking } = useDeleteBooking(bookingId);

  const { checkout, isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();

  if (isLoadingBooking) return <Spinner />;

  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open open="booking">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Modal.Window
            name="booking"
            modalTitle="Delete Booking"
            isPerfomingAction={isDeletingBooking}
          >
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
