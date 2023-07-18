import React from "react";
import { Link, useSubmit } from "react-router-dom";

import styled from "styled-components";

import { getUserId } from "../../util/auth";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import { importImg } from "../../util/img";

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

  const articleCreatedDate = article.created_at.split("T")[0];

  return (
    <ArticleDetailBox>
      <Wrapper>
        <ArticleSkeleton>
          <ImgRow>
            <img src={article.img ? article.img : importImg("cat4.jpg")} />
          </ImgRow>
          <FirstRow>
            <TitleAndCategory>
              <h3>{article.title}</h3>
              <span>#{article.category}</span>
            </TitleAndCategory>
            <p>{article.user.clinic_info[0].clinic_name}</p>
            <small>Created at. {articleCreatedDate}</small>
          </FirstRow>

          <SecondRow>
            <p>{article.content}</p>
          </SecondRow>

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
        </ArticleSkeleton>
      </Wrapper>
    </ArticleDetailBox>
  );
};

export default ArticleDetail;

const ArticleDetailBox = styled.section`
  font-family: "Noto Sans KR", sans-serif;
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;

const ArticleSkeleton = styled.div`
  padding: 1rem;
`;

const ImgRow = styled.section`
  width: 100%;
  height: 500px;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const FirstRow = styled.section`
  margin-bottom: 1.5rem;

  p {
    margin-bottom: 3px;
  }
  small {
    color: ${palette.gray[6]};
    font-style: italic;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
  }
`;

const TitleAndCategory = styled.div`
  display: flex;
  margin-bottom: 3px;

  h3 {
    font-size: 2rem;
    font-weight: 600;
    margin-right: 15px;
  }
  span {
    position: relative;
    bottom: -17px;
    color: ${palette.point[0]};
  }
`;

const SecondRow = styled.section`
  margin-bottom: 1.5rem;
  padding-bottom: 6rem;
`;

const ButtonBox = styled.div`
  margin-top: 2rem;

  button {
    margin-right: 0.5rem;
  }
`;
