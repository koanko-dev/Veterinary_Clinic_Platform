import React from "react";
import { useSearchParams, redirect } from "react-router-dom";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import axios from "../axios-post";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return <div>{isLogin ? <Login /> : <Signup />}</div>;
};

export default AuthPage;

export const action = async ({request}) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();

  if (mode === "login") {
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post("accounts/login/", authData);

      const token = response.data.key;
      localStorage.setItem("token", token);

      return redirect("/");
    } catch (err) {
      if (response.status === 422 || response.status === 401) {
        return response;
      }
    }
  } else {
    const authData = {
      email: data.get("email"),
      username: data.get("username"),
      password1: data.get("password1"),
      password2: data.get("password2"),
    };

    try {
      const response = await axios.post("accounts/signup/", authData);

      const token = response.data.key;
      localStorage.setItem("token", token);

      return redirect("/");
    } catch (err) {
      if (response.status === 422 || response.status === 401) {
        return response;
      }
    }
  }
};
