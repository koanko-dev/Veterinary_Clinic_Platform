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

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    console.log("Unsupported mode.");
    return;
  }

  const data = await request.formData();

  if (mode === "login") {
    // Login
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const loginResponse = await axios.post("accounts/login/", authData);
      const token = loginResponse.data.key;

      const userResponse = await axios.get("accounts/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const userId = userResponse.data.pk;
      
      const profileResponse = await axios.get(`accounts/profile/${userId}`);

      let group = 'clinic';
      if (profileResponse.data.pet_name) {
        group = 'general'
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("group", group);

      return redirect("/");
    } catch (err) {
      if (loginResponse.status === 422 || loginResponse.status === 401) {
        return response;
      }
    }
  } else {
    // Signup
    const group = searchParams.get("group");

    const authData = {
      email: data.get("email"),
      username: data.get("username"),
      password1: data.get("password1"),
      password2: data.get("password2"),
    };

    try {
      // Basic Sign Up
      const signupResponse = await axios.post("accounts/signup/", authData);
      const token = signupResponse.data.key;

      const userResponse = await axios.get("accounts/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const userId = userResponse.data.pk;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      let groupResponse = null;

      // Save Info by Group
      if (group === "clinic") {
        // Save Clinic Info
        const groupData = {
          group: "clinic",
          clinic_name: data.get("clinic_name"),
          bio: data.get("bio"),
          address: data.get("address"),
          address_area: data.get("address_area"),
          specialized_field: data.get("specialized_field"),
          specialized_species: data.get("specialized_species"),
        };

        groupResponse = await axios.post(`accounts/groups/${userId}/`, groupData);
        localStorage.setItem("group", "clinic");
      } else {
        // Save General User Info
        const groupData = {
          pet_name: data.get("pet_name"),
          pet_species: data.get("pet_species"),
          address_area: data.get("address_area"),
        };

        groupResponse = await axios.post(`accounts/groups/${userId}/`, groupData);
        localStorage.setItem("group", "general");
      }
      return redirect("/");
    } catch (err) {
      if (signupResponse.status === 422 || signupResponse.status === 401) {
        return signupResponse;
      }
      if (groupResponse.status === 422 || groupResponse.status === 401) {
        return groupResponse;
      }
    }
  }
};
