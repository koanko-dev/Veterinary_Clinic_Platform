import React from "react";

import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const Login = () => {
  return (
    <div>
      <h2>로그인</h2>
      <LoginForm />
      <SocialLogin/>
    </div>
  );
};

export default Login;
