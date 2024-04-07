import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
	background: var(--color-grey-0);
	padding: 20px 15px;
	border-right: 1px solid var(--color-gray-100);
	width: 20%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	position: fixed;
	z-index: 999;
	height: 100vh;

	@media (max-width: 480px) {
		width: 50%;
		left: -100%;
	}
`;

const Sidebar = () => {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />
			<Uploader />
		</StyledSidebar>
	);
};

export default Sidebar;
