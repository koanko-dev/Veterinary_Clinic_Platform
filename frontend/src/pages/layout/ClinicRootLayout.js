import React from "react";
import { Outlet } from "react-router-dom";

const ClinicRootLayout = () => {
  return (
    <>
      <h2>동물병원</h2>
      <Outlet />
    </>
  );
};

export default ClinicRootLayout;
