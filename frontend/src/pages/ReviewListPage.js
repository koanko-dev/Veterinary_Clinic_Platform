import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import axios from "../axios-post";
import styled from "styled-components";

import ReviewCard from "../components/review/ReviewCard";
import ReviewModal from "../components/review/ReviewModal";
import ModalContext from "../store/modal-context";
import {
  petSpecies,
  clinicCategories,
  areas,
} from "../lib/resources/resources";
import Button from "../components/UI/Button";
import Responsive from "../components/UI/Responsive";

const ReviewListPage = () => {
  const { data } = useLoaderData();
  const [reviewModalContent, setReviewModalContent] = useState({});
  const [reviewList, setReviewList] = useState(data);
  const navigation = useNavigation();
  const modalCtx = useContext(ModalContext);
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData) {
      setReviewList(actionData.data);
    }
  }, [actionData]);

  const showModalHandler = (review) => {
    setReviewModalContent(review);
    modalCtx.onShowModal();
  };

  let content = <p>작성된 리뷰가 없습니다.</p>;

  if (reviewList.length > 0) {
    content = reviewList.map((review) => {
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
  }

  return (
    <ReviewListPageBox>
      {modalCtx.isShow && (
        <ReviewModal
          onClose={modalCtx.onCloseModal}
          review={reviewModalContent}
        />
      )}
      <Wrapper>
        <Form method="post">
          <select name="pet_species">
            <option value="">-------</option>
            {petSpecies.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="clinic_category">
            <option value="">-------</option>
            {clinicCategories.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="clinic_area">
            <option value="">-------</option>
            {areas.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="ordering">
            <option value="default">최신순으로 보기</option>
            <option value="rating_ascending">낮은별점순으로 보기</option>
            <option value="rating_descending">높은별점순으로 보기</option>
            <option value="price_ascending">낮은가격순으로 보기</option>
            <option value="price_descending">높은가격순으로 보기</option>
          </select>

          <Button theme="point" disabled={isSubmitting}>
            {isSubmitting ? "필터 적용중..." : "필터 적용"}
          </Button>
        </Form>

        <div>
          <ul>{content}</ul>
        </div>
      </Wrapper>
    </ReviewListPageBox>
  );
};

export default ReviewListPage;

export const loader = async () => {
  try {
    const response = await axios.get("reviews/");
    return response;
  } catch (err) {
    return err;
  }
};

export const action = async ({ request }) => {
  const data = await request.formData();

  const pet_species = data.get("pet_species");
  const clinic_category = data.get("clinic_category");
  const clinic_area = data.get("clinic_area");
  const ordering = data.get("ordering");

  let urlParams = "?";

  if (pet_species) {
    urlParams += `pet_species=${pet_species}&`;
  }
  if (clinic_category) {
    urlParams += `clinic_category=${clinic_category}&`;
  }
  if (clinic_area) {
    urlParams += `clinic_area=${clinic_area}&`;
  }
  if (ordering) {
    urlParams += `ordering=${ordering}&`;
  }

  try {
    const filteredRes = await axios.get(`reviews/search/${urlParams}`);
    return filteredRes;
  } catch (err) {
    console.log("err", err);
  }
};

const ReviewListPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;
