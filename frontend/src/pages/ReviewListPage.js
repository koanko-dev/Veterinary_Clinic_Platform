import React, { useEffect, useState, useCallback, useContext } from "react";
// import { useParams } from "react-router-dom";
import axios from "../axios-post";

import ReviewCard from "../components/review/ReviewCard";
import ReviewModal from "../components/review/ReviewModal";
import ModalContext from "../store/modal-context";

const ReviewListPage = ({ match }) => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState({});

  const modalCtx = useContext(ModalContext);
//   const params = useParams();

  const fetchReviewListHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("reviews/");
      setReviewList(res.data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReviewListHandler();
    
    // console.log(params);
  }, [fetchReviewListHandler]);

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

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      {modalCtx.isShow && (
        <ReviewModal onClose={modalCtx.onCloseModal} review={reviewContent} />
      )}
      <div>
        <h2>동물병원 후기</h2>
        <ul>{content}</ul>
      </div>
    </>
  );
};

export default ReviewListPage;
