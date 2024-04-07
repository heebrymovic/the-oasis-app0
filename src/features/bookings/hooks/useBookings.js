import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../../services/apiBookings";
import { PAGE_SIZE } from "../../../utils/global";

export const useBookings = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const statusParams = searchParams.get("status") || "all";

  const filter = { field: "status", type: statusParams };

  const sortByParams = searchParams.get("sortBy") || "created_at-asc";

  const [field, orderType] = sortByParams.split("-");

  const sortBy = { field, orderType };

  let currentPage = searchParams.get("page");

  currentPage = currentPage ? +currentPage : 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
    retry: false,
  });

  const totalPage = Math.ceil(count / PAGE_SIZE);

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
      retry: false,
    });
  }

  if (!isLoading && currentPage !== totalPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
      retry: false,
    });
  }

  return { isLoading, bookings, count, error };
};
