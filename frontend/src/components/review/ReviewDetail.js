import React from "react";
import { Link, useSubmit } from "react-router-dom";
import { getUserId } from "../../util/auth";

const ReviewDetail = ({ review }) => {
  const submit = useSubmit();
  const userId = getUserId();

  const deleteReviewHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <h2>ReviewDetailPage</h2>
      <p>{review.title}</p>
      <p>{review.content}</p>
      {review.user.id === userId && (
        <>
          <Link to="edit">수정</Link>
          <button onClick={deleteReviewHandler}>삭제</button>
        </>
      )}
    </>
  );
};

export default ReviewDetail;
