import React from "react";
import { useLoaderData } from "react-router-dom";

import axios from "../axios-post";
import GeneralUserProfile from "../components/profile/GeneralUserProfile";
import ClinicUserProfile from "../components/profile/ClinicUserProfile";

const UserProfilePage = () => {
  const { data } = useLoaderData();
  const isClinicUser = data.clinic_name !== undefined;

  return isClinicUser ? (
    <ClinicUserProfile userData={data} />
  ) : (
    <GeneralUserProfile userData={data} />
  );
};

export default UserProfilePage;

export const loader = async ({ params }) => {
  const userId = params.userId;

  try {
    const res = await axios.get(`accounts/profile/${userId}/`);
    return res;
  } catch (err) {
    console.log("error!", err);
  }
};