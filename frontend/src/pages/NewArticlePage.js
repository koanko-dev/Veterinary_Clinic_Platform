import React from "react";
import ArticleForm from "../components/article/ArticleForm";

import styled from "styled-components";
import Responsive from "../components/UI/Responsive";

const NewArticlePage = () => {
  return (
    <NewArticlePageBox>
      <Wrapper>
        <h2>아티클 작성</h2>
        <ArticleForm method="post" />
      </Wrapper>
    </NewArticlePageBox>
  );
};

export default NewArticlePage;

const NewArticlePageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
