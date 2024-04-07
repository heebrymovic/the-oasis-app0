import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import {
  UpdateUserDataForm,
  UpdatePasswordForm,
} from "../features/authentication";

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Account = () => {
  return (
    <StyledAccount>
      <Heading as="h1">Update your account</Heading>

      <div>
        <Row>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      </div>
    </StyledAccount>
  );
};

export default Account;
