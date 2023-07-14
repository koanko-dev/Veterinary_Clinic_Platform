import React from "react";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import {
  areas,
  petSpecies,
  clinicCategories,
} from "../../lib/resources/resources";

const isNotEmpty = (value) => value.trim() !== "";
const isAddressArea = (value) => areas.includes(value);
const isSpecializedField = (value) => clinicCategories.includes(value);
const isSpecializedSpecies = (value) => petSpecies.includes(value);
const emptyErrorMsg = "값을 입력해주세요.";

const ClinicSignupForm = ({checkValidation}) => {
  const {
    value: clinicNameValue,
    isValid: clinicNameIsValid,
    hasError: clinicNameHasError,
    valueChangeHandler: clinicNameChangeHandler,
    inputBlurHandler: clinicNameBlurHandler,
    reset: resetClinicName,
  } = useInput(isNotEmpty);

  const {
    value: bioValue,
    isValid: bioIsValid,
    hasError: bioHasError,
    valueChangeHandler: bioChangeHandler,
    inputBlurHandler: bioBlurHandler,
    reset: resetBio,
  } = useInput(isNotEmpty);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: addressAreaValue,
    isValid: addressAreaIsValid,
    hasError: addressAreaHasError,
    valueChangeHandler: addressAreaChangeHandler,
    inputBlurHandler: addressAreaBlurHandler,
    reset: resetAddressArea,
  } = useInput(isAddressArea);

  const {
    value: specializedFieldValue,
    isValid: specializedFieldIsValid,
    hasError: specializedFieldHasError,
    valueChangeHandler: specializedFieldChangeHandler,
    inputBlurHandler: specializedFieldBlurHandler,
    reset: resetSpecializedField,
  } = useInput(isSpecializedField);

  const {
    value: specializedSpeciesValue,
    isValid: specializedSpeciesIsValid,
    hasError: specializedSpeciesHasError,
    valueChangeHandler: specializedSpeciesChangeHandler,
    inputBlurHandler: specializedSpeciesBlurHandler,
    reset: resetSpecializedSpecies,
  } = useInput(isSpecializedSpecies);

  if (
    clinicNameIsValid &&
    bioIsValid &&
    addressIsValid &&
    addressAreaIsValid &&
    specializedFieldIsValid &&
    specializedSpeciesIsValid
  ) {
    checkValidation(true);
  }

  return (
    <>
      <Input
        label={"클리닉 이름"}
        name={"clinic_name"}
        type={"textLine"}
        value={clinicNameValue}
        onChange={clinicNameChangeHandler}
        onBlur={clinicNameBlurHandler}
        hasError={clinicNameHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"클리닉 설명"}
        name={"bio"}
        type={"textBox"}
        value={bioValue}
        onChange={bioChangeHandler}
        onBlur={bioBlurHandler}
        hasError={bioHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"주소"}
        name={"address"}
        type={"textLine"}
        value={addressValue}
        onChange={addressChangeHandler}
        onBlur={addressBlurHandler}
        hasError={addressHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"지역"}
        name={"address_area"}
        type={"select"}
        options={areas}
        value={addressAreaValue}
        onChange={addressAreaChangeHandler}
        onBlur={addressAreaBlurHandler}
        hasError={addressAreaHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"전문 분야"}
        name={"specialized_field"}
        type={"select"}
        options={clinicCategories}
        value={specializedFieldValue}
        onChange={specializedFieldChangeHandler}
        onBlur={specializedFieldBlurHandler}
        hasError={specializedFieldHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"전문 동물"}
        name={"specialized_species"}
        type={"select"}
        options={petSpecies}
        value={specializedSpeciesValue}
        onChange={specializedSpeciesChangeHandler}
        onBlur={specializedSpeciesBlurHandler}
        hasError={specializedSpeciesHasError}
        errorMsg={emptyErrorMsg}
      />
    </>
  );
};

export default ClinicSignupForm;
