import React from "react";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import {
  areas,
  petSpecies,
} from "../../lib/resources/resources";

const isNotEmpty = (value) => value.trim() !== "";
const isPetSpecies = (value) => petSpecies.includes(value);
const isAddressArea = (value) => areas.includes(value);
const emptyErrorMsg = "값을 입력해주세요.";

const GeneralSignupForm = ({ checkValidation }) => {
  const {
    value: petNameValue,
    isValid: petNameIsValid,
    hasError: petNameHasError,
    valueChangeHandler: petNameChangeHandler,
    inputBlurHandler: petNameBlurHandler,
    reset: resetPetName,
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
    value: addressAreaValue,
    isValid: addressAreaIsValid,
    hasError: addressAreaHasError,
    valueChangeHandler: addressAreaChangeHandler,
    inputBlurHandler: addressAreaBlurHandler,
    reset: resetAddressArea,
  } = useInput(isAddressArea);

  if (petNameIsValid && petSpeciesIsValid && addressAreaIsValid) {
    checkValidation(true);
  }

  return (
    <>
      <Input
        label={"반려동물 이름"}
        name={"pet_name"}
        type={"textLine"}
        value={petNameValue}
        onChange={petNameChangeHandler}
        onBlur={petNameBlurHandler}
        hasError={petNameHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"반려동물 종류"}
        name={"pet_species"}
        type={"select"}
        options={petSpecies}
        value={petSpeciesValue}
        onChange={petSpeciesChangeHandler}
        onBlur={petSpeciesBlurHandler}
        hasError={petSpeciesHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"거주지역"}
        name={"address_area"}
        type={"select"}
        options={areas}
        value={addressAreaValue}
        onChange={addressAreaChangeHandler}
        onBlur={addressAreaBlurHandler}
        hasError={addressAreaHasError}
        errorMsg={emptyErrorMsg}
      />
    </>
  );
};

export default GeneralSignupForm;
