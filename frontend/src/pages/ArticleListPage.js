import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios-post";

import ArticleCard from "../components/article/ArticleCard";

const ArticleListPage = (props) => {
  const navigate = useNavigate();

  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <ul>{content}</ul>
    </div>
  );
};

export default ArticleListPage;
