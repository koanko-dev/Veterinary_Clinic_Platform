import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getUserId = () => {
  const userId = localStorage.getItem("userId");
  return +userId;
};

export const getGroup = () => {
  const group = localStorage.getItem("group");
  return group;
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
};
