import React from "react";
import { useRouteLoaderData, redirect, useSubmit } from "react-router-dom";

import axios from "../axios-post";

const ReviewDetailPage = () => {
  const { data } = useRouteLoaderData("review-detail");
  const submit = useSubmit();

  const deleteReviewHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <h2>ReviewDetailPage</h2>
      <p>{data.title}</p>
      <p>{data.content}</p>
      <button onClick={deleteReviewHandler}>삭제</button>
    </>
  );
};

export default ReviewDetailPage;

export const loader = async ({ params }) => {
  const reviewId = params.rnum;

  try {
    const response = await axios.get(`reviews/${reviewId}/`);
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteReviewAction = async ({ params, request }) => {
  const reviewId = params.rnum;
  const dummyToken = 'adsjfiajoesifaw';

  if (request.method === "DELETE") {
    try {
      await axios.delete(`reviews/${reviewId}/`, {
        headers: `Token ${dummyToken}`
      });
      return redirect("/reviews");
    } catch (err) {
      console.log("err", err);
    }
  }
};
