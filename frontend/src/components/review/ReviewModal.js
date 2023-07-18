import React, { useEffect } from "react";
import { useSubmit } from "react-router-dom";

import Modal from "../UI/Modal";
import ReviewContent from "./ReviewContent";

const ReviewModal = ({ onClose, review }) => {
  const submit = useSubmit();

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
      <ReviewContent review={review} onDeleteReview={deleteReviewHandler} />
    </Modal>
  );
};

export default ReviewModal;
