import React from "react";
import { Link } from "react-router-dom";

const ReviewList = ({reviews}) => {
  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link to={`/reviews/${review.id}`}>
              {/* <img src={review.img} alt={review.title} /> */}
              <div>
                <h2>{review.title}</h2>
                <time>{review.created_at}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
