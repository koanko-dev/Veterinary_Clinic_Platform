import React from "react";
import ReviewForm from "../components/review/ReviewForm";

import styled from "styled-components";
import Responsive from "../components/UI/Responsive";

const NewReviewPage = () => {
  return (
    <NewReviewPageBox>
      <Wrapper>
        <h2>리뷰 작성</h2>
        <ReviewForm method="post" />
      </Wrapper>
    </NewReviewPageBox>
  );
};

export default NewReviewPage;

const NewReviewPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
