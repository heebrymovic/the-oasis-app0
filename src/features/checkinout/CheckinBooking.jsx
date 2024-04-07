import styled from "styled-components";
import { useState, useEffect } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useBooking } from "../bookings/hooks/";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./hooks";
import { useSettings } from "../settings/hooks";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const { isLoadingBooking, booking } = useBooking();

  const { checkin, isCheckingIn } = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);

  const [needBreakfast, setNeedBreakfast] = useState(false);

  const { setting, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  const moveBack = useMoveBack();

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    cabinPrice,
  } = booking;

  const optionalBreakfast = setting.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return false;

    if (needBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: optionalBreakfast + cabinPrice,
        },
      });
    } else checkin({ bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            onChange={() => {
              setNeedBreakfast((check) => !check);
              setConfirmPaid((paid) => !paid);
            }}
          >
            Customer needs to order breakfast
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          onChange={() => setConfirmPaid((paid) => !paid)}
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {needBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfast,
              )}  (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast,
              )})`
            : formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
