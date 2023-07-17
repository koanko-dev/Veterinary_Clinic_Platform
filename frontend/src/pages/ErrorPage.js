import React from "react";
import { useRouteError } from "react-router-dom";

import styled from "styled-components";

import NavBar from "../components/common/NavBar";
import PageContent from "../components/common/PageContent";
import Responsive from "../components/UI/Responsive";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("ErrorPage", error);

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.error.message;
  }

  if (error.status === 405) {
    title = error.status;
    message = error.error.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <NavBar />
      <ErrorPageBox>
        <Wrapper>
          <PageContent title={title}>
            <p>{message}</p>
          </PageContent>
        </Wrapper>
      </ErrorPageBox>
    </>
  );
};

export default ErrorPage;

const ErrorPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
