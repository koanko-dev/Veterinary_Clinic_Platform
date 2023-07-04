import React from "react";
import { useParams } from "react-router-dom";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";

const AuthPage = () => {
  let params = useParams();
  console.log('authPath')
  console.log(params.authPath)

  return <div>{params.authPath === "login" ? <Login /> : <Signup />}</div>;
};

export default AuthPage;
