import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../../services/apiBookings";

export const useRecentStays = () => {
	const [searchParams] = useSearchParams();

	const days = !searchParams.get("last") ? 7 : +searchParams.get("last");

	const startBookingDays = subDays(new Date(), days).toISOString();

	const { data: recentStays, isLoading: loadingRecentStays } = useQuery({
		queryKey: ["stays", `last-${days}`],
		queryFn: () => getStaysAfterDate(startBookingDays),
	});

	const confirmedStays = recentStays?.filter(
		(stays) =>
			stays.status === "checked-in" || stays.status === "checked-out",
	);

	return { confirmedStays, loadingRecentStays, days };
};
