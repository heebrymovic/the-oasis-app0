import styled from "styled-components";

const Heading = styled.h1.withConfig({
	shouldForwardProp: (prop, defaultValidatorFn) => !["align"].includes(prop),
})`
	font-weight: 600;
	text-align: ${(props) => props.align};
	${(props) => props.as === "h1" && `font-size: 2.5rem;`}
	${(props) => props.as === "h2" && `font-size: 2rem;`}
	${(props) => props.as === "h3" && `font-size: 1.8rem;`}
	${(props) => props.as === "h4" && `font-size: 1.5rem;`}
`;

export default Heading;
