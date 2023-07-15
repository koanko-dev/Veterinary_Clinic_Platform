import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import ArticleForm from "../components/article/ArticleForm";

const EditArticlePage = () => {
  const { data } = useRouteLoaderData("article-detail");

  return (
    <>
      <h2>아티클 수정</h2>
      <ArticleForm method="put" article={data} />
    </>
  );
};

export default EditArticlePage;
