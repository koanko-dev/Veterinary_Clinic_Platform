import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import styled from "styled-components";

import NavBar from "../../components/common/NavBar";

const RootLayout = () => {
  // const navigation = useNavigation();

  return (
    <>
      <NavBar />
      <Main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </Main>
    </>
  );
};

export default RootLayout;

const Main = styled.main`
  margin-top: 7rem;
`;
