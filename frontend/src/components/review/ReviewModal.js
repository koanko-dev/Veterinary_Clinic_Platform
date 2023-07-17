import React, { useEffect } from "react";
import Modal from "../UI/Modal";
import { Link, useSubmit } from "react-router-dom";
import { getUserId } from "../../util/auth";
import Button from "../UI/Button";

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
          <Link to={`/reviews/${review.id}/edit`}>
            <Button theme="outlinePoint">수정</Button>
          </Link>
          <Button theme="point" onClick={deleteReviewHandler}>
            삭제
          </Button>
        </>
      )}
    </Modal>
  );
};

export default ReviewModal;
