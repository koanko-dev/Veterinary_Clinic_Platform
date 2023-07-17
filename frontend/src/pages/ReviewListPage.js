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
import Filter from "../components/UI/Filter";

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
          review={review}
          onShow={() => showModalHandler(review)}
        />
      );
    });
  }

  const filter = [
    {
      name: "clinic_area",
      defaultText: "지역 선택",
      optionValues: areas,
      optionLabel: areas,
    },
    {
      name: "pet_species",
      defaultText: "동물 종류 선택",
      optionValues: petSpecies,
      optionLabel: petSpecies,
    },
    {
      name: "clinic_category",
      defaultText: "진료 분야 선택",
      optionValues: clinicCategories,
      optionLabel: clinicCategories,
    },
    {
      name: "ordering",
      defaultText: "최신순으로 보기",
      optionValues: [
        "rating_ascending",
        "rating_descending",
        "price_ascending",
        "price_descending",
      ],
      optionLabel: [
        "낮은 별점순으로 보기",
        "높은 별점순으로 보기",
        "낮은 가격순으로 보기",
        "높은 가격순으로 보기",
      ],
    },
  ];

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
          <Filter filterData={filter} />
          <ButtonBox>
            <Button theme="point" disabled={isSubmitting}>
              {isSubmitting ? "필터 적용중..." : "필터 적용"}
            </Button>
          </ButtonBox>
        </Form>

        <ContentBox>{content}</ContentBox>
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ContentBox = styled.ul`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
