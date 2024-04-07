import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import { UserAvatar } from "../features/authentication";

const StyledHeader = styled.header`
	background: var(--color-grey-0);
	padding: 5px 20px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 20px;
	height: 70px;
	border-bottom: 1px solid var(--color-gray-light);
	position: fixed;
	width: 80%;
	z-index: 99;

	@media (max-width: 480px) {
		width: 100%;
	}
`;

const Header = () => {
	return (
		<StyledHeader>
			<UserAvatar />
			<HeaderMenu />
		</StyledHeader>
	);
};

export default Header;
