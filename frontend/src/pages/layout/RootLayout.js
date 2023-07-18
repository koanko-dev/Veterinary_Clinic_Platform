import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

import NavBar from "../../components/common/NavBar";
import palette from "../../lib/styles/palette";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default RootLayout;

const Main = styled.main`
  margin-top: 7rem;
  color: ${palette.gray[8]};
`;
