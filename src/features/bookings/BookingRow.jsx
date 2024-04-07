import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import { HiDotsVertical } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { AiTwotoneSchedule } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { useCheckout } from "../checkinout/hooks";
import { useDeleteBooking } from "./hooks";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({
  num,
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) => {
  const navigate = useNavigate();

  const { deleteBooking, isDeletingBooking } = useDeleteBooking(bookingId);

  const { checkout } = useCheckout();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <span>{num}</span>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} Icon={<HiDotsVertical />} />

          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<FaEye />}
            >
              View Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<FiArrowUpCircle />}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                onClick={() => checkout(bookingId)}
                icon={<AiTwotoneSchedule />}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open open="delete">
              <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window
            name="delete"
            modalTitle="Delete Booking"
            isPerfomingAction={isDeletingBooking}
          >
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              disabled={isDeletingBooking}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
