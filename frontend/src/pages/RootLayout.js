import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

import NavBar from "../components/common/NavBar";

const RootLayout = () => {
  // const navigation = useNavigation();

  return (
    <>
      <NavBar />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
