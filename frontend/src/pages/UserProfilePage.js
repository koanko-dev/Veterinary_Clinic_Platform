import React from "react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const params = useParams();
  const userName = params.name;

  return <div>{userName}</div>;
};

export default UserProfilePage;
