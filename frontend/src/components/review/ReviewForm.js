import React, { useEffect } from "react";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";

import axios from "../../axios-post";
import useInput from "../../hooks/use-input";
import {
  areas,
  petSpecies,
  clinicCategories,
} from "../../lib/resources/resources";
import Input from "../UI/Input";
import { getAuthToken } from "../../util/auth";

const isNotEmpty = (value) => value.trim() !== "";
const isAlwaysTrue = (value) => true;
const isClinicArea = (value) => areas.includes(value);
const isPetSpecies = (value) => petSpecies.includes(value);
const isClinicCategory = (value) => clinicCategories.includes(value);
const emptyErrorMsg = "값을 입력해주세요.";
const valueErrorMsg = "옳은 값을 입력해주세요.";

const ReviewForm = ({ method, review }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // const {clinic_id}
  const {
    value: clinicAreaValue,
    isValid: clinicAreaIsValid,
    hasError: clinicAreaHasError,
    valueChangeHandler: clinicAreaChangeHandler,
    inputBlurHandler: clinicAreaBlurHandler,
    reset: resetClinicArea,
    setDefaultValueHandler: setDefaultClinicAreaValueHandler,
  } = useInput(isClinicArea);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
    setDefaultValueHandler: setDefaultTitleValueHandler,
  } = useInput(isNotEmpty);

  const {
    value: petSpeciesValue,
    isValid: petSpeciesIsValid,
    hasError: petSpeciesHasError,
    valueChangeHandler: petSpeciesChangeHandler,
    inputBlurHandler: petSpeciesBlurHandler,
    reset: resetPetSpecies,
    setDefaultValueHandler: setDefaultPetSpeciesValueHandler,
  } = useInput(isPetSpecies);

  const {
    value: clinicCategoryValue,
    isValid: clinicCategoryIsValid,
    hasError: clinicCategoryHasError,
    valueChangeHandler: clinicCategoryChangeHandler,
    inputBlurHandler: clinicCategoryBlurHandler,
    reset: resetClinicCategory,
    setDefaultValueHandler: setDefaultClinicCategoryValueHandler,
  } = useInput(isClinicCategory);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
    setDefaultValueHandler: setDefaultPriceValueHandler,
  } = useInput(isAlwaysTrue);

  const {
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
    setDefaultValueHandler: setDefaultContentValueHandler,
  } = useInput(isNotEmpty);

  const {
    value: ratingValue,
    isValid: ratingIsValid,
    hasError: ratingHasError,
    valueChangeHandler: ratingChangeHandler,
    inputBlurHandler: ratingBlurHandler,
    reset: resetRating,
    setDefaultValueHandler: setDefaultRatingValueHandler,
  } = useInput(isAlwaysTrue);

  useEffect(() => {
    setDefaultClinicAreaValueHandler(review ? review.clinic_area : "");
    setDefaultTitleValueHandler(review ? review.title : "");
    setDefaultPetSpeciesValueHandler(review ? review.pet_species : "");
    setDefaultClinicCategoryValueHandler(review ? review.clinic_category : "");
    setDefaultPriceValueHandler(review ? review.price : "");
    setDefaultContentValueHandler(review ? review.content : "");
    setDefaultRatingValueHandler(review ? review.rating : "");
  }, []);

  let formIsValid = false;

  if (
    clinicAreaIsValid &&
    titleIsValid &&
    petSpeciesIsValid &&
    clinicCategoryIsValid &&
    priceIsValid &&
    contentIsValid &&
    ratingIsValid
  ) {
    formIsValid = true;
  }

  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   if (!formIsValid) {
  //     return;
  //   }

  //   resetClinicArea();
  //   resetTitle();
  //   resetPetSpecies();
  //   resetClinicCategory();
  //   resetPrice();
  //   resetContent();
  //   resetRating();
  // };

  // const titleClasses = titleHasError ? "titleStyle invalid" : "titleStyle";
  // const petSpeciesClasses = petSpeciesHasError
  //   ? "titleStyle invalid"
  //   : "titleStyle";

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Form method={method}>
      <Input
        label={"후기 제목"}
        name={"title"}
        type={"textLine"}
        value={titleValue}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        hasError={titleHasError}
        errorMsg={emptyErrorMsg}
      />
      {/* img input */}
      <Input
        label={"반려동물 종류"}
        name={"pet_species"}
        type={"select"}
        options={petSpecies}
        value={petSpeciesValue}
        onChange={petSpeciesChangeHandler}
        onBlur={petSpeciesBlurHandler}
        hasError={petSpeciesHasError}
        errorMsg={valueErrorMsg}
      />
      <Input
        label={"진료 카테고리"}
        name={"clinic_category"}
        type={"select"}
        options={clinicCategories}
        value={clinicCategoryValue}
        onChange={clinicCategoryChangeHandler}
        onBlur={clinicCategoryBlurHandler}
        hasError={clinicAreaHasError}
        errorMsg={valueErrorMsg}
      />
      <Input
        label={"진료 가격"}
        name={"price"}
        type={"number"}
        value={priceValue}
        onChange={priceChangeHandler}
        onBlur={priceBlurHandler}
        hasError={priceHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"동물병원 지역"}
        name={"clinic_area"}
        type={"select"}
        options={areas}
        value={clinicAreaValue}
        onChange={clinicAreaChangeHandler}
        onBlur={clinicAreaBlurHandler}
        hasError={clinicAreaHasError}
        errorMsg={valueErrorMsg}
      />
      <Input
        label={"후기 내용"}
        name={"content"}
        type={"textBox"}
        value={contentValue}
        onChange={contentChangeHandler}
        onBlur={contentBlurHandler}
        hasError={contentHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"평점"}
        name={"rating"}
        type={"number"}
        value={ratingValue}
        onChange={ratingChangeHandler}
        onBlur={ratingBlurHandler}
        hasError={ratingHasError}
        errorMsg={emptyErrorMsg}
      />

      <div>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          취소
        </button>
        <button disabled={!formIsValid | isSubmitting}>
          {isSubmitting ? "저장중..." : "저장"}
        </button>
      </div>
    </Form>
  );
};

export default ReviewForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const reviewData = {
    clinic_id: +params.cnum,
    clinic_area: data.get("clinic_area"),
    title: data.get("title"),
    // img: data.get("img"),
    pet_species: data.get("pet_species"),
    clinic_category: data.get("clinic_category"),
    price: +data.get("price"),
    content: data.get("content"),
    rating: +data.get("rating"),
  };

  const token = getAuthToken();

  if (method === "PUT") {
    // Edit review
    const reviewId = params.rnum;

    try {
      await axios.put(`reviews/${reviewId}/`, reviewData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/reviews");
    } catch (err) {
      console.log("err", err);
      return response;
    }
  } else {
    // New review
    try {
      await axios.post(`reviews/`, reviewData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/reviews");
    } catch (err) {
      console.log("err", err);
      return response;
    }
  }
};
