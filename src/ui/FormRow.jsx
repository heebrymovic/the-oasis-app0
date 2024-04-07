import styled from "styled-components";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	/*grid-template-columns: 24rem 1fr 1.2fr;*/
	grid-template-columns: 0.9fr 1.2fr 0.7fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}

	@media (max-width: 480px) {
		grid-template-columns: 1fr;
		gap: 0.1rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

const FormRow = ({ label, error, children }) => {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
};

export default FormRow;