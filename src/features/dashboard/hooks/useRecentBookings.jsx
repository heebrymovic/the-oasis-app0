import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";

export const useRecentBookings = () => {
	const [searchParams] = useSearchParams();

	const days = !searchParams.get("last") ? 7 : +searchParams.get("last");

	const startBookingDays = subDays(new Date(), days).toISOString();

	const { data: recentBookings, isLoading: loadingRecentBookings } = useQuery(
		{
			queryKey: ["bookings", `last-${days}`],
			queryFn: () => getBookingsAfterDate(startBookingDays),
		},
	);

	return { recentBookings, loadingRecentBookings };
};
