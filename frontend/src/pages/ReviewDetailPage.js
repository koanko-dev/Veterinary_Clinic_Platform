import React from "react";
import { useRouteLoaderData, redirect } from "react-router-dom";

import axios from "../axios-post";
import ReviewDetail from "../components/review/ReviewDetail";
import { getAuthToken } from "../util/auth";

const ReviewDetailPage = () => {
  const { data } = useRouteLoaderData("review-detail");

  return <ReviewDetail review={data} />;
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
  const token = getAuthToken();

  if (request.method === "DELETE") {
    try {
      await axios.delete(`reviews/${reviewId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/reviews");
    } catch (err) {
      console.log("err", err);
      return response
    }
  }
};
