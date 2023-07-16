import React from "react";

import styled from "styled-components";

const PageContent = ({ title, children }) => {
  return (
    <PageContentBox>
      <h1>{title}</h1>
      {children}
    </PageContentBox>
  );
};

export default PageContent;

const PageContentBox = styled.div`
  margin-top: 7rem;
`;
