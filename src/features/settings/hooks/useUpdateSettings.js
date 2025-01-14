import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["setting"] });
			toast.success("Settings Successfully Updated");
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
};
