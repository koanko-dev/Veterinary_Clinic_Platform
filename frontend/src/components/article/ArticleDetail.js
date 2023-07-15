import React from "react";
import { Link, useSubmit } from "react-router-dom";
import { getUserId } from "../../util/auth";

const ArticleDetail = ({ article }) => {
  const submit = useSubmit();
  const userId = getUserId();

  const deleteArticleHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <h2>ArticleDetail</h2>
      <p>{article.title}</p>
      <p>{article.content}</p>
      {article.user.id === userId && (
        <>
          <Link to="edit">수정</Link>
          <button onClick={deleteArticleHandler}>삭제</button>
        </>
      )}
    </>
  );
};

export default ArticleDetail;
