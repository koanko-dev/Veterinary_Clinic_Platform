import React from "react";
import ReviewForm from "../components/review/ReviewForm";

const NewReviewPage = () => {
  return (
    <>
      <h2>리뷰 작성</h2>
      <ReviewForm method='post'/>
    </>
  );
};

export default NewReviewPage;
