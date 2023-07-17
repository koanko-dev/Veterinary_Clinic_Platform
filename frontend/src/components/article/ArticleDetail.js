import React from "react";
import { Link, useSubmit } from "react-router-dom";

import styled from "styled-components";

import { getUserId } from "../../util/auth";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";

const ArticleDetail = ({ article }) => {
  const submit = useSubmit();
  const userId = getUserId();

  const deleteArticleHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  console.log(article);

  return (
    <ArticleDetailBox>
      <Wrapper>
        <h2>{article.title}</h2>
        <p>{article.category}</p>
        <p>{article.created_at}</p>
        <p>{article.user.clinic_info[0].clinic_name}</p>
        <p>{article.content}</p>
        {article.user.id === userId && (
          <ButtonBox>
            <Link to="edit">
              <Button theme="outlinePoint">수정</Button>
            </Link>
            <Button theme="point" onClick={deleteArticleHandler}>
              삭제
            </Button>
          </ButtonBox>
        )}
      </Wrapper>
    </ArticleDetailBox>
  );
};

export default ArticleDetail;

const ArticleDetailBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;

const ButtonBox = styled.div`
  margin-top: 2rem;
  width: 142px;
  display: flex;
  justify-content: space-between;
`;
