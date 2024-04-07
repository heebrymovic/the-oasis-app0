import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const { isLoading: isLoadingLogin, mutate: login } = useMutation({
		mutationFn: (data) => loginApi({ ...data }),
		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user.user);

			toast.success("Login Successful");

			setTimeout(() => navigate("/", { replace: true }), 2000);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { isLoadingLogin, login };
};
