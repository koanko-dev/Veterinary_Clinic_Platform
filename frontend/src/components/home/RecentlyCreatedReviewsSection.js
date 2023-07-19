import React from "react";

import styled from "styled-components";

import ReviewCard from "../review/ReviewCard";
import palette from "../../lib/styles/palette";
import InfiniteLooper from "../UI/InfiniteLooper";
import { importImg } from "../../util/img";

const RecentlyCreatedReviewsSection = ({ recentlyCreatedReviews }) => {
  return (
    <RecentlyCreatedReviewsSectionBox>
      <TitleBox>
        <img src={importImg("yellow_cat.png")} />
        <h2>Make an Appointment!</h2>
        <p>The administrator will contact you shortly to confirm</p>
        <p>the time and day of consultation.</p>
      </TitleBox>
      <ul>
        <InfiniteLooper speed="20" direction="left">
          {recentlyCreatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </InfiniteLooper>
      </ul>
    </RecentlyCreatedReviewsSectionBox>
  );
};

export default RecentlyCreatedReviewsSection;

const RecentlyCreatedReviewsSectionBox = styled.section`
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  padding-top: 4rem;
  margin-top: 8rem;
  margin-bottom: 2rem;
  background-color: ${palette.yellow[0]};

  ul {
    display: flex;
  }
`;

const TitleBox = styled.div`
  margin: 0 auto 3rem;
  width: fit-content;
  position: relative;

  img {
    width: 100px;
    position: absolute;
    top: -11px;
    right: -103px;
  }

  h2 {
    color: #000;
    font-weight: 600;
    font-size: 2.5rem;
    margin-bottom: 8px;
    text-align: center;
  }

  p {
    color: #000;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
  }
`;
