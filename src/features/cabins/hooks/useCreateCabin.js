import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = (reset, onCloseModal) => {
	const queryClient = useQueryClient();

	const { mutate: creatingCabin, isLoading: isSubmitting } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("Cabin Successfully created");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset?.();
			onCloseModal?.();
		},
		onError: (err) => toast.error(err.message),
	});

	return { creatingCabin, isSubmitting };
};
