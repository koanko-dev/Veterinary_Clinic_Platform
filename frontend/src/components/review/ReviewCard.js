import React from "react";

import styled from "styled-components";
import Rating from "@mui/material/Rating";
import palette from "../../lib/styles/palette";

const ReviewCard = ({ review, onShow }) => {
  return (
    <ReviewCardBox onClick={onShow}>
      <div>
        <Rating
          size="small"
          precision={0.25}
          name="read-only"
          value={review.rating}
          readOnly
        />
      </div>
      <h3>{review.title}</h3>
      <UserName>{review.user.username}</UserName>
      <TagBox>
        <span>#{review.pet_species}</span>
        <span>#{review.clinic_category}</span>
      </TagBox>
      <ReviewContentBox>{review.content}</ReviewContentBox>
    </ReviewCardBox>
  );
};

export default ReviewCard;

const ReviewCardBox = styled.li`
  width: 220px;
  height: 280px;
  list-style-type: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 20px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  align-items: center;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const UserName = styled.p`
  font-size: 13px;
  color: ${palette.gray[6]};
`;

const TagBox = styled.p`
  margin: 8px 0;

  span {
    color: ${palette.point[0]};
    background-color: transparent;
    padding: 0px 1px;
    border-radius: 2rem;
    box-sizing: border-box;
    margin-right: 4px;
    font-size: 13px;
  }
`;

const ReviewContentBox = styled.div`
  height: 75px;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
