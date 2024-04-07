import styled from "styled-components";
import { LoginForm } from "../features/authentication";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media (max-width: 480px) {
    grid-template-columns: unset;
  }
`;

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading align="center" as="h3">
        Login to your account
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
