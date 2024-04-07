import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as apiUpdateUser } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = (closeModal) => {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: (data) => apiUpdateUser({ ...data }),
		onSuccess: ({ user }) => {
			toast.success("User profile Successfully Updated");

			queryClient.setQueryData(["user", user]);

			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateUser, isUpdating };
};
