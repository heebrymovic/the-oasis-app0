import styled from "styled-components";
import { useDarkmode } from "../context/darkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkmode } = useDarkmode();

  const img = darkmode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={img} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
