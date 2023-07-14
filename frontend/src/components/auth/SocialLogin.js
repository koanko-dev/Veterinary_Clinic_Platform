import React from "react";

import googleBtn from "../../assets/google_btn.png";
import kakaoeBtn from "../../assets/kakao_btn.png";
import axios from "../../axios-post";
import { Link } from "react-router-dom";

const SocialLogin = () => {
  return (
    <div>
      <a href="http://127.0.0.1:8000/api/accounts/google/login/">
        <img src={googleBtn} alt="google login" />
      </a>
      <a href="http://127.0.0.1:8000/api/accounts/kakao/login/">
        <img src={kakaoeBtn} alt="kakao login" />
      </a>
    </div>
  );
};

export default SocialLogin;
