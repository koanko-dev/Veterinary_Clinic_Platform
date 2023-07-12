import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import axios from "../axios-post";

const ArticleDetailPage = () => {
  const params = useParams();
  const articleId = params.anum;

  const [article, setArticle] = useState({
    title: "",
    category: "",
    created_at: "",
    clinicName: "",
    img: "",
    content: "",
    comments: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticleHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`articles/${articleId}`);
      setArticle({
        title: res.data.title,
        category: res.data.category,
        created_at: res.data.created_at,
        clinicName: res.data.user.clinic_info[0].clinic_name,
        img: res.data.img,
        content: res.data.content,
        comments: res.data.comments,
      });
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchArticleHandler();
  }, [fetchArticleHandler]);

  let content = article;

  if (article) {
    content = (
      <>
        <h2>{article.title}</h2>
        <p>{article.category}</p>
        <p>{article.created_at}</p>
        <p>{article.clinicName}</p>
        <p>{article.img}</p>
        <p>{article.content}</p>
        <p>{article.comments}</p>
      </>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <div>{content}</div>;
};

export default ArticleDetailPage;
