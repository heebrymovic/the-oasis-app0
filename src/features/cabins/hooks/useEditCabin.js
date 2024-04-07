import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = (closeModal) => {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin Successfully Edited");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			closeModal();
		},
		onError: (err) => toast.error(err.message),
	});

	return { editCabin, isEditing };
};
