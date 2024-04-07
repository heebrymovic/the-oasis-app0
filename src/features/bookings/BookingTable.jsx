import { useSearchParams } from "react-router-dom";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./hooks";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

import { PAGE_SIZE } from "../../utils/global";

const BookingTable = () => {
  const { isLoading, bookings, count } = useBookings();

  const [searchParams] = useSearchParams();

  let currentPage = searchParams.get("page") ? +searchParams.get("page") : 1;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.2fr 0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>S/N</div>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking, ind) => (
            <BookingRow
              key={booking.id}
              num={
                currentPage > 1
                  ? currentPage * PAGE_SIZE - PAGE_SIZE + ind + 1
                  : currentPage + ind
              }
              booking={booking}
            />
          )}
        />

        <Table.Footer>
          <Pagination total={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
