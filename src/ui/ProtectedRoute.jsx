import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks";
import Spinner from "./Spinner";

const FullPage = styled.div`
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	place-items: center;
	background: var(--color-grey-100);
	z-index: 999;
`;

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !isLoading)
			navigate("/login", { replace: true });
	}, [isAuthenticated, isLoading, navigate]);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
};

export default ProtectedRoute;
