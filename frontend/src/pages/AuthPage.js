import React from "react";
import { useParams } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const AuthPage = () => {
  const params = useParams();
  console.log('authPath!', params.authPath)

  return <div>{params.authPath === "login" ? <Login /> : <Signup />}</div>;
};

export default AuthPage;
