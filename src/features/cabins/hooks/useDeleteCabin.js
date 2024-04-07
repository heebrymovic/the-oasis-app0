import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: deletingCabin, isLoading: isDeleting } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Successfully deleted");
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deletingCabin };
};
