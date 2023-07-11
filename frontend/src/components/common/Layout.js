import React from "react";

import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const dummyUserName = 'anko';

  return (
    <>
      <NavBar userName={dummyUserName} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
