import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "../axios-post";

import ReviewCard from "../components/review/ReviewCard";
import ReviewModal from "../components/review/ReviewModal";
import ModalContext from "../store/modal-context";

const ReviewListPage = () => {
  const { data } = useLoaderData();
  const reviewList = data;
  const [reviewContent, setReviewContent] = useState({});

  const modalCtx = useContext(ModalContext);

  const showModalHandler = (review) => {
    setReviewContent(review);
    modalCtx.onShowModal();
  };

  const reviews = reviewList.map((review) => {
    return (
      <ReviewCard
        key={review.id}
        username={review.user.username}
        title={review.title}
        rating={review.rating}
        created_at={review.created_at}
        content={review.content}
        onShow={() => showModalHandler(review)}
      />
    );
  });

  let content = <p>작성된 리뷰가 없습니다.</p>;

  if (reviewList.length > 0) {
    content = reviews;
  }

  // if (error) {
  //   content = <p>{error}</p>;
  // }

  return (
    <>
      {modalCtx.isShow && (
        <ReviewModal onClose={modalCtx.onCloseModal} review={reviewContent} />
      )}
      <div>
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default ReviewListPage;

export const loader = async () => {
  try {
    const response = await axios.get("reviews/");
    return response;
  } catch (err) {
    return err;
  }
}
