import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useModalClose = (closeWindow, isPerfomingAction) => {
	const ref = useRef();

	useEffect(() => {
		const handleModalClick = (e) => {
			if (e.target?.id === ref.current?.id && !isPerfomingAction)
				closeWindow();

			if (isPerfomingAction && e.target?.id === ref.current?.id)
				toast.error(
					"You cannot Close Modal because there is an ongoing Action",
				);
		};

		document.addEventListener("click", handleModalClick);

		return () => document.removeEventListener("click", handleModalClick);
	}, [closeWindow, isPerfomingAction]);

	return ref;
};
