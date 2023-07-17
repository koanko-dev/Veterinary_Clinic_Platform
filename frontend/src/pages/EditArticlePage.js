import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import styled from "styled-components";

import ArticleForm from "../components/article/ArticleForm";
import Responsive from "../components/UI/Responsive";

const EditArticlePage = () => {
  const { data } = useRouteLoaderData("article-detail");

  return (
    <EditArticlePageBox>
      <Wrapper>
        <h2>아티클 수정</h2>
        <ArticleForm method="put" article={data} />
      </Wrapper>
    </EditArticlePageBox>
  );
};

export default EditArticlePage;

const EditArticlePageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
