import React from "react";
import useInput from "../../hooks/use-input";
import {
  areas,
  petSpecies,
  clinicCategories,
} from "../../lib/resources/resources";
import Input from "../UI/Input";

const isNotEmpty = (value) => value.trim() !== "";
const isClinicArea = (value) => areas.includes(value);
const isPetSpecies = (value) => petSpecies.includes(value);
const isClinicCategory = (value) => clinicCategories.includes(value);
const emptyErrorMsg = "값을 입력해주세요.";
const valueErrorMsg = "옳은 값을 입력해주세요.";

const ReviewForm = (props) => {
  // const {clinic_id}
  const {
    value: clinicAreaValue,
    isValid: clinicAreaIsValid,
    hasError: clinicAreaHasError,
    valueChangeHandler: clinicAreaChangeHandler,
    inputBlurHandler: clinicAreaBlurHandler,
    reset: resetClinicArea,
  } = useInput(isClinicArea);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: petSpeciesValue,
    isValid: petSpeciesIsValid,
    hasError: petSpeciesHasError,
    valueChangeHandler: petSpeciesChangeHandler,
    inputBlurHandler: petSpeciesBlurHandler,
    reset: resetPetSpecies,
  } = useInput(isPetSpecies);

  const {
    value: clinicCategoryValue,
    isValid: clinicCategoryIsValid,
    hasError: clinicCategoryHasError,
    valueChangeHandler: clinicCategoryChangeHandler,
    inputBlurHandler: clinicCategoryBlurHandler,
    reset: resetClinicCategory,
  } = useInput(isClinicCategory);

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNotEmpty);

  const {
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
  } = useInput(isNotEmpty);

  const {
    value: ratingValue,
    isValid: ratingIsValid,
    hasError: ratingHasError,
    valueChangeHandler: ratingChangeHandler,
    inputBlurHandler: ratingBlurHandler,
    reset: resetRating,
  } = useInput(isNotEmpty);

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(
      clinicAreaValue,
      titleValue,
      petSpeciesValue,
      clinicCategoryValue,
      priceValue,
      contentValue,
      ratingValue
    );

    resetClinicArea();
    resetTitle();
    resetPetSpecies();
    resetClinicCategory();
    resetPrice();
    resetContent();
    resetRating();
  };

  const titleClasses = titleHasError ? "titleStyle invalid" : "titleStyle";
  const petSpeciesClasses = petSpeciesHasError
    ? "titleStyle invalid"
    : "titleStyle";

  return (
    <form onSubmit={submitHandler}>
      <Input
        label={"후기 제목"}
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
        type={"number"}
        value={priceValue}
        onChange={priceChangeHandler}
        onBlur={priceBlurHandler}
        hasError={priceHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"동물병원 지역"}
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
        type={"textBox"}
        value={contentValue}
        onChange={contentChangeHandler}
        onBlur={contentBlurHandler}
        hasError={contentHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"평점"}
        type={"number"}
        value={ratingValue}
        onChange={ratingChangeHandler}
        onBlur={ratingBlurHandler}
        hasError={ratingHasError}
        errorMsg={emptyErrorMsg}
      />

      <div className="form-actions">
        <button disabled={!formIsValid}>저장</button>
      </div>
    </form>
  );
};

export default ReviewForm;
