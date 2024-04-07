import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { HiOutlineUserCircle } from "react-icons/hi2";

import ButtonIcon from "./ButtonIcon";
import DarkMode from "./DarkMode";
import { Logout } from "../features/authentication";

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 5px;
`;

const HeaderMenu = () => {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon>
					<HiOutlineUserCircle onClick={() => navigate("/account")} />
				</ButtonIcon>
			</li>

			<li>
				<DarkMode />
			</li>

			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
};

export default HeaderMenu;
