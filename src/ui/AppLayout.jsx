import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Main = styled.main`
	background: var(--color-grey-0);
	padding: 4rem;
	margin: 70px 0;
`;

const StyledAppLayout = styled.div`
	display: flex;
	height: 100vh;
`;

const StyledGroup = styled.div`
	height: 100%;
	width: 80%;
	left: 20%;
	position: relative;

	@media (max-width: 480px) {
		left: 0%;
		width: 100%;
	}
`;

const AppLayout = () => {
	return (
		<StyledAppLayout>
			<Sidebar />
			<StyledGroup>
				<Header />
				<Main>
					<Outlet />
				</Main>
			</StyledGroup>
		</StyledAppLayout>
	);
};

export default AppLayout;
