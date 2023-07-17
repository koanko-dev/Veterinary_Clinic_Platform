import React from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";

import styled from "styled-components";

import ReviewForm from "../components/review/ReviewForm";
import Responsive from "../components/UI/Responsive";

const EditReviewPage = () => {
  const { data } = useRouteLoaderData("review-detail");

  return (
    <EditReviewPageBox>
      <Wrapper>
        <h2>리뷰 수정</h2>
        <ReviewForm method="put" review={data} />
      </Wrapper>
    </EditReviewPageBox>
  );
};

export default EditReviewPage;

const EditReviewPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
