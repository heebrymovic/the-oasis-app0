import ButtonIcon from "./ButtonIcon";
import { HiMoon, HiSun } from "react-icons/hi";
import { useDarkmode } from "../context/darkModeContext";

const DarkMode = () => {
	const { darkmode, toggleDarkmode } = useDarkmode();

	return (
		<ButtonIcon onClick={toggleDarkmode}>
			{darkmode ? <HiSun /> : <HiMoon />}
		</ButtonIcon>
	);
};

export default DarkMode;
