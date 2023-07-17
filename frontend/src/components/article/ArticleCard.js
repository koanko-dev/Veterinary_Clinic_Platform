import React from "react";

import styled from "styled-components";

import { importImg } from "../../util/img";
import palette from "../../lib/styles/palette";

const ArticleCard = ({ article, onClink }) => {
  return (
    <ArticleCardBox onClick={() => onClink(article.id)}>
      <img src={importImg("cat4.jpg")} />
      <h3>{article.title}</h3>
      <span>{article.user.clinic_info[0].clinic_name}</span>
      <CategoryTag>{article.category}</CategoryTag>
    </ArticleCardBox>
  );
};

export default ArticleCard;

const ArticleCardBox = styled.li`
  position: relative;
  height: 360px;
  width: 49%;
  list-style-type: none;
  margin-bottom: 2rem;

  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  h3 {
    margin-top: 6px;
    font-size: 20px;
    font-weight: 600;
  }

  span {
    color: ${palette.gray[6]};
    font-size: 13px;
  }
`;

const CategoryTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  color: ${palette.gray[7]};
  background-color: transparent;
  border: 1.5px solid ${palette.gray[7]};
  padding: 4px 11px;
  border-radius: 2.3rem;
  box-sizing: border-box;
  margin-right: 4px;
  font-size: 13px;
  font-weight: 600;
`;
