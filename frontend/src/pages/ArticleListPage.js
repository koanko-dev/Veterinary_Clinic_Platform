import React, { useEffect, useState, useCallback } from "react";
import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import axios from "../axios-post";

import ArticleCard from "../components/article/ArticleCard";
import { petSpecies } from "../lib/resources/resources";

const ArticleListPage = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

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
        id={article.id}
        title={article.title}
        clinicName={article.user.clinic_info[0].clinic_name}
        category={article.category}
        created_at={article.created_at}
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

  return (
    <div>
      <Form method="post">
        <select name="category">
          <option value="">-------</option>
          {petSpecies.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <select name="ordering">
          <option value="default">최신순으로 보기</option>
          <option value="created_at_ascending">과거순으로 보기</option>
        </select>

        <button disabled={isSubmitting}>
          {isSubmitting ? "필터 적용중..." : "필터 적용"}
        </button>
      </Form>

      <div>
        <ul>{content}</ul>
      </div>
    </div>
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
