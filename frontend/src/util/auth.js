export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
}

export const getUserId = () => {
  const userId = localStorage.getItem("userId");
  return userId;
}

export const tokenLoader = () => {
  return getAuthToken();
}
