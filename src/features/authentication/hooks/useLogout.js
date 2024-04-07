import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogout = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: apiLogout,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
			toast.success("Successfully Logout");
		},
	});

	return { logout, isLoading };
};
