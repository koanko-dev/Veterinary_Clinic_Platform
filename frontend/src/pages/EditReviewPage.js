import React from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import ReviewForm from "../components/review/ReviewForm";

const EditReviewPage = () => {
  const { data } = useRouteLoaderData("review-detail");

  return (
    <>
      <h2>리뷰 수정</h2>
      <ReviewForm method="put" review={data} />
    </>
  );
};

export default EditReviewPage;
