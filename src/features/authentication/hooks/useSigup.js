import { useMutation } from "@tanstack/react-query";
import { signUp as apiSignUp } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useSigup = () => {
	const { mutate: signUp, isLoading } = useMutation({
		mutationFn: (data) => apiSignUp({ ...data }),
		onSuccess: () => {
			toast.success("Registration Successful");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { signUp, isLoading };
};
