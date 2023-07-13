import React from "react";
import { Outlet } from "react-router-dom";

const ArticleRootLayout = () => {
  return (
    <>
      <h2>아티클</h2>
      <Outlet />
    </>
  );
};

export default ArticleRootLayout;
