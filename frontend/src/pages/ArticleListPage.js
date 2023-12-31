import React, { useEffect, useState, useCallback } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import axios from "../axios-post";
import styled from "styled-components";

import ArticleCard from "../components/article/ArticleCard";
import { petSpecies } from "../lib/resources/resources";
import Button from "../components/UI/Button";
import Responsive from "../components/UI/Responsive";
import Filter from "../components/UI/Filter";
import { getGroup } from "../util/auth";

const ArticleListPage = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const group = getGroup();

  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSubmitting = navigation.state === "submitting";

  const fetchArticleListHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("articles/");
      setArticleList(res.data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchArticleListHandler();
  }, [fetchArticleListHandler]);

  useEffect(() => {
    if (actionData) {
      setArticleList(actionData.data);
    }
  }, [actionData]);

  const showArticleDetailHandler = (articleId) => {
    navigate(`${articleId}`);
  };

  const articles = articleList.map((article) => {
    return (
      <ArticleCard
        key={article.id}
        article={article}
        onClink={showArticleDetailHandler}
      />
    );
  });

  let content = <p>작성된 아티클이 없습니다.</p>;

  if (articleList.length > 0) {
    content = articles;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const filter = [
    {
      name: "category",
      defaultText: "동물 종류 선택",
      optionValues: petSpecies,
      optionLabel: petSpecies,
    },
    {
      name: "ordering",
      defaultText: "최신순으로 보기",
      optionValues: ["created_at_ascending"],
      optionLabel: ["과거순으로 보기"],
    },
  ];

  return (
    <ArticleListPageBox>
      <Wrapper>
        {/* <h2>Search Clinic, Make an Appointment</h2> */}
        <Form method="post">
          <Filter filterData={filter} />
          <ButtonBox>
            {group === "clinic" && (
              <Link to="new">
                <Button theme="outlinePoint">아티클 작성</Button>
              </Link>
            )}
            <Button theme="point" disabled={isSubmitting}>
              {isSubmitting ? "필터 적용중..." : "필터 적용"}
            </Button>
          </ButtonBox>
        </Form>

        <ArticleBox>{content}</ArticleBox>
      </Wrapper>
    </ArticleListPageBox>
  );
};

export default ArticleListPage;

export const action = async ({ request }) => {
  const data = await request.formData();

  const category = data.get("category");
  const ordering = data.get("ordering");

  let urlParams = "?";

  if (category) {
    urlParams += `category=${category}&`;
  }
  if (ordering) {
    urlParams += `ordering=${ordering}&`;
  }

  try {
    const filteredRes = await axios.get(`articles/search/${urlParams}`);
    return filteredRes;
  } catch (err) {
    console.log("err", err);
  }
};

const ArticleListPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;

  /* h2 {
    font-weight: 400;
    text-align: center;
    margin-bottom: 4rem;
  } */
`;

const Wrapper = styled(Responsive)``;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;

  button {
    margin-left: 8px;
  }
`;

const ArticleBox = styled.ul`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
