import React from "react";

import styled from "styled-components";

import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import Responsive from "../UI/Responsive";

const Login = () => {
  return (
    <LoginBox>
      <Wrapper>
        <SmallWrapper>
          <h2>로그인</h2>
          <LoginForm />
          <SocialLogin />
        </SmallWrapper>
      </Wrapper>
    </LoginBox>
  );
};

export default Login;

const LoginBox = styled.section`
  padding-top: 2rem;
`;

const Wrapper = styled(Responsive)``;

const SmallWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 600px;

  h2 {
    margin-bottom: 2rem;
  }
`;
