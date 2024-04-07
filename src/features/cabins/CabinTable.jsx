import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  let filteredCabin = [];

  const searchValue = searchParams.get("discount") || "all";

  if (searchValue === "all") filteredCabin = cabins;

  if (searchValue === "no-discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount === 0);

  if (searchValue === "discount")
    filteredCabin = cabins?.filter((cabin) => cabin.discount > 0);

  const sortedBy = searchParams.get("sortBy") || "name-asc";

  const [searchKey, searchType] = sortedBy.split("-");

  const modifier = searchType === "asc" ? 1 : -1;

  const sortedCabin = filteredCabin?.sort((a, b) => {
    if (!["name"].includes(searchKey)) {
      return (a[searchKey] - b[searchKey]) * modifier;
    } else {
      return modifier === 1
        ? a[searchKey].localeCompare(b[searchKey])
        : b[searchKey].localeCompare(a[searchKey]);
    }
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <span></span>
          <span>Cabin</span>
          <span>Capacity</span>
          <span>Price</span>
          <span>Discount</span>
          <span>Status</span>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
