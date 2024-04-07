import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { BookingTable } from "../features/bookings";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Checked Out", value: "checked-out" },
  { label: "Checked In", value: "checked-in" },
  { label: "Unconfirmed", value: "unconfirmed" },
];

const SortOptions = [
  { value: "startDate-desc", label: "Sort By date (recent first)" },
  { value: "startDate-asc", label: "Sort By date (earliest first)" },
  { value: "totalPrice-desc", label: "Sort By amount (high first)" },
  { value: "totalPrice-asc", label: "Sort By amount (low first)" },
];

const Bookings = () => {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <TableOperations>
          <Filter filterField="status" options={filterOptions} />
          <SortBy options={SortOptions} />
        </TableOperations>
      </Row>
      <BookingTable />
    </Row>
  );
};

export default Bookings;
