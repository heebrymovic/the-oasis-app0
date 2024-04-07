import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation(
		{
			mutationFn: (bookingId) => deleteBookingApi(bookingId),
			onSuccess: (data) => {
				console.log(data);
				toast.success(`Booking Successfully deleted`);
				queryClient.invalidateQueries({ active: true });
			},
			onError: () => {
				toast.error(`Failed to delete Booking`);
			},
		},
	);

	return { deleteBooking, isDeletingBooking };
};
