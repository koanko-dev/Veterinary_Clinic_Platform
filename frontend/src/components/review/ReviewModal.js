import React from "react";
import Modal from "../UI/Modal";
import { Link, useSubmit } from "react-router-dom";

const ReviewModal = ({ onClose, review }) => {
  const submit = useSubmit();

  const deleteReviewHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete", action: `/reviews/${review.id}?index`  });
    }
  };

  return (
    <Modal onClose={onClose}>
      ReviewModal
      <p>{review.title}</p>
      <p>{review.content}</p>
      <Link to={`/reviews/${review.id}/edit`}>수정</Link>
      <button onClick={deleteReviewHandler}>삭제</button>
    </Modal>
  );
};

export default ReviewModal;
