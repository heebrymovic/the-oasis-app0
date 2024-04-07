import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";

export const useSettings = () => {
	const { data: setting, isLoading } = useQuery({
		queryFn: getSettings,
		queryKey: ["settings"],
	});

	return { setting, isLoading };
};
