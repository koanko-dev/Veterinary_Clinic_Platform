import React from "react";
import { redirect, useRouteLoaderData } from "react-router-dom";

import axios from "../axios-post";
import ArticleDetail from "../components/article/ArticleDetail";
import { getAuthToken } from "../util/auth";

const ArticleDetailPage = () => {
  const { data } = useRouteLoaderData("article-detail");

  return <ArticleDetail article={data} />;
};

export default ArticleDetailPage;

export const loader = async ({ params }) => {
  const articleId = params.anum;

  try {
    const response = await axios.get(`articles/${articleId}/`);
    return response;
  } catch (err) {
    return err;
  }
};

export const action = async ({ params, request }) => {
  const articleId = params.anum;
  const token = getAuthToken();

  if (request.method === "DELETE") {
    try {
      await axios.delete(`articles/${articleId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/articles");
    } catch (err) {
      console.log("err", err);
      return response;
    }
  }
};
