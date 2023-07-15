import React, { useEffect } from "react";
import Modal from "../UI/Modal";
import { Link, useSubmit } from "react-router-dom";
import { getUserId } from "../../util/auth";

const ReviewModal = ({ onClose, review }) => {
  const submit = useSubmit();
  const userId = getUserId();

  useEffect(() => {
    return () => {
      onClose();
    };
  }, []);

  const deleteReviewHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete", action: `/reviews/${review.id}?index` });
    }
  };

  return (
    <Modal onClose={onClose}>
      ReviewModal
      <p>{review.title}</p>
      <p>{review.rating}</p>
      <p>{review.price}</p>
      <p>{review.content}</p>
      {review.user.id === userId && (
        <>
          <Link to={`/reviews/${review.id}/edit`}>수정</Link>
          <button onClick={deleteReviewHandler}>삭제</button>
        </>
      )}
    </Modal>
  );
};

export default ReviewModal;
