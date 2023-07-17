import React from "react";

import styled from "styled-components";

const PageContent = ({ title, children }) => {
  return (
    <PageContentBox>
      <h2>{title}</h2>
      {children}
    </PageContentBox>
  );
};

export default PageContent;

const PageContentBox = styled.div`
  margin-top: 7rem;
`;
