import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/review/ReviewForm";

const EditReviewPage = () => {
  const params = useParams();
  const review_id = params.rnum;

  useEffect(() => {
    console.log("review_id", review_id);
  }, []);

  const heading = review_id ? '리뷰 수정' : '리뷰 작성'

  return (
    <>
      <h2>{heading}</h2>
      <ReviewForm />
    </>
  );
};

export default EditReviewPage;
