import React from "react";

import axios from "../../axios-post";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { importImg } from "../../util/img";

const SocialLogin = () => {
  return (
    <SocialLoginBox>
      <a href="http://127.0.0.1:8000/api/accounts/google/login/">
        <img src={importImg("google_btn.png")} alt="google login" />
      </a>
      <a href="http://127.0.0.1:8000/api/accounts/kakao/login/">
        <img src={importImg("kakao_btn.png")} alt="kakao login" />
      </a>
    </SocialLoginBox>
  );
};

export default SocialLogin;

const SocialLoginBox = styled.section`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;
