import React from "react";
import ArticleForm from "../components/article/ArticleForm";

const NewArticlePage = () => {
  return (
    <>
      <h2>아티클 작성</h2>
      <ArticleForm method="post" />
    </>
  );
};

export default NewArticlePage;
