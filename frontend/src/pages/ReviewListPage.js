import React, { useEffect, useState, useCallback } from "react";
import axios from "../axios-post";

const ReviewListPage = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, [fetchReviewListHandler]);

  const reviews = reviewList.map((review) => {
    return (
      <li key={review.id}>
        <h3>{review.title}</h3>
        <p>{review.content}</p>
      </li>
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
    <div>
      <h2>동물병원 후기</h2>
      <ul>{content}</ul>
    </div>
  );
};

export default ReviewListPage;
