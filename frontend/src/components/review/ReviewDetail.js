import React from "react";
import { Link, useSubmit } from "react-router-dom";

import styled from "styled-components";

import { getUserId } from "../../util/auth";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";

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
    <ReviewDetailBox>
      <Wrapper>
        <h2>ReviewDetailPage</h2>
        <p>{review.title}</p>
        <p>{review.content}</p>
        {review.user.id === userId && (
          <>
            <Link to="edit">
              <Button theme="outlinePoint">수정</Button>
            </Link>
            <Button theme="point" onClick={deleteReviewHandler}>
              삭제
            </Button>
          </>
        )}
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
