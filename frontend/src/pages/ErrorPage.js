import React from "react";
import { useRouteError } from "react-router-dom";
import NavBar from "../components/common/NavBar";

import PageContent from "../components/common/PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  console.log('ErrorPage', error)

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.error.message;
  }

  if (error.status === 405) {
    title = error.status
    message = error.error.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <NavBar />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
