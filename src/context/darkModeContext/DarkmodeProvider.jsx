import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export const DarkmodeContext = createContext();

const DarkmodeProvider = ({ children }) => {
	const [darkmode, setDarkmode] = useLocalStorageState(false, "darkmode");

	const toggleDarkmode = () => {
		setDarkmode((darkmode) => !darkmode);
	};

	console.log(darkmode);

	useEffect(() => {
		if (darkmode) {
			document.documentElement.classList.remove("light");
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
		}
	}, [darkmode]);

	return (
		<DarkmodeContext.Provider value={{ darkmode, toggleDarkmode }}>
			{children}
		</DarkmodeContext.Provider>
	);
};

export default DarkmodeProvider;
