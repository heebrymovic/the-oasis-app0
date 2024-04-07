import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { CabinTable, AddCabin } from "../features/cabins";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "No Discount", value: "no-discount" },
  { label: "With Discount", value: "discount" },
];

const SortOptions = [
  { value: "name-asc", label: "Sort By name (A-Z)" },
  { value: "name-desc", label: "Sort By name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort By Price (lowest)" },
  { value: "regularPrice-desc", label: "Sort By Price (highest)" },
  { value: "maxCapacity-asc", label: "Sort By Capacity (lowest)" },
  { value: "maxCapacity-desc", label: "Sort By Capacity (highest)" },
];

const Cabins = () => {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations>
          <Filter filterField="discount" options={filterOptions} />
          <SortBy options={SortOptions} />
        </TableOperations>
      </Row>

      <Row>
        <AddCabin />
        <CabinTable />
      </Row>
    </Row>
  );
};

export default Cabins;
