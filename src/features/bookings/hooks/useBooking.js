import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

export const useBooking = () => {
	const { bookingId } = useParams();

	const { isLoading: isLoadingBooking, data: booking } = useQuery({
		queryKey: ["booking", bookingId],
		queryFn: () => getBooking(bookingId),
	});

	return { isLoadingBooking, booking };
};
