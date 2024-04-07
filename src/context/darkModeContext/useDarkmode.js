import { useContext } from "react";

import { DarkmodeContext } from "./DarkmodeProvider";

export const useDarkmode = () => {
	const darkmodeContext = useContext(DarkmodeContext);

	if (!darkmodeContext)
		throw new Error("Darkmode Context cannot be used outside its Provider");

	return darkmodeContext;
};
