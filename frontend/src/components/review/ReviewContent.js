import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Divider, Rating } from "@mui/material";

import { getUserId } from "../../util/auth";
import Button from "../UI/Button";
import palette from "../../lib/styles/palette";

const ReviewContent = ({ review, onDeleteReview }) => {
  const userId = getUserId();

  return (
    <ReviewModalBox>
      <FirstRow>
        <h3>{review.title}</h3>
        <small>{review.user.username}</small>
        <p>
          <Rating
            value={review.rating}
            size="small"
            precision={0.25}
            name="read-only"
            readOnly
          />
          <DateTime>{review.created_at}</DateTime>
        </p>
      </FirstRow>

      <SecondRow>
        <p>진료 지역 : {review.clinic_area}</p>
        <p>진료 동물 : {review.pet_species}</p>
        <p>진료 분야 : {review.clinic_category}</p>
        <p>진료 비용 : {review.price}</p>
      </SecondRow>

      <Divider />

      <ThirdRow>
        <p>{review.content}</p>
      </ThirdRow>

      {review.user.id === userId && (
        <ButtonBox>
          <Link to={`/reviews/${review.id}/edit`}>
            <Button theme="outlinePoint">수정</Button>
          </Link>
          <Button theme="point" onClick={onDeleteReview}>
            삭제
          </Button>
        </ButtonBox>
      )}
    </ReviewModalBox>
  );
};

export default ReviewContent;

const ReviewModalBox = styled.div`
  margin-top: 8px;
  padding: 1rem;
`;

const FirstRow = styled.section`
  margin-bottom: 1rem;

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }
  small {
    color: ${palette.gray[6]};
  }
`;

const SecondRow = styled.section`
  margin-bottom: 1.5rem;

  p {
    margin-bottom: 3px;
    color: ${palette.gray[7]};
  }
`;

const ThirdRow = styled.section`
  margin-top: 1.5rem;
  min-height: 32vh;
`;

const DateTime = styled.small`
  position: relative;
  bottom: 4px;
  left: 6px;
`;

const ButtonBox = styled.section`
  button {
    margin-right: 0.5rem;
  }
`;
