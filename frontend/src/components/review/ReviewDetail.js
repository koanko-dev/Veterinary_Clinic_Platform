import React from "react";
import { useSubmit } from "react-router-dom";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import ReviewContent from "./ReviewContent";

const ReviewDetail = ({ review }) => {
  const submit = useSubmit();

  const deleteReviewHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <ReviewDetailBox>
      <Wrapper>
        <ReviewContent review={review} onDeleteReview={deleteReviewHandler} />
      </Wrapper>
    </ReviewDetailBox>
  );
};

export default ReviewDetail;

const ReviewDetailBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;
