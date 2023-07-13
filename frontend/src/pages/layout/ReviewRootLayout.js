import React from "react";
import { Outlet } from "react-router-dom";

const ReviewRootLayout = () => {
  return (
    <>
      <h2>동물병원 후기</h2>
      <Outlet />
    </>
  );
};

export default ReviewRootLayout;
