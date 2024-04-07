import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { CiLogout } from "react-icons/ci";
import { useLogout } from "./hooks";

const Logout = () => {
	const { logout, isLoading } = useLogout();

	const handleLogout = () => {
		logout();
	};

	return (
		<ButtonIcon disabled={isLoading} onClick={handleLogout}>
			{isLoading ? <SpinnerMini /> : <CiLogout />}
		</ButtonIcon>
	);
};

export default Logout;
