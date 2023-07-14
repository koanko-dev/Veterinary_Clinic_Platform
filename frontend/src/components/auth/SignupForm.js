import React from "react";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";
// const isSamePassword = (value) =>
const emailErrorMsg = "옳은 이메일 형식을 입력해주세요.";
const emptyErrorMsg = "값을 입력해주세요.";

const SignupForm = ({checkValidation}) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: password1Value,
    isValid: password1IsValid,
    hasError: password1HasError,
    valueChangeHandler: password1ChangeHandler,
    inputBlurHandler: password1BlurHandler,
    reset: resetPassword1,
  } = useInput(isNotEmpty);

  const {
    value: password2Value,
    isValid: password2IsValid,
    hasError: password2HasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2,
  } = useInput(isNotEmpty);

  if (emailIsValid && usernameIsValid && password1IsValid && password2IsValid) {
    checkValidation(true);
  }

  // const usernameClasses = usernameHasError
  //   ? "usernameStyle invalid"
  //   : "usernameStyle";
  // const emailClasses = emailHasError ? "emailStyle invalid" : "emailStyle";

  return (
    <>
      <Input
        label={"이메일"}
        name={"email"}
        type={"textLine"}
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        hasError={emailHasError}
        errorMsg={emailErrorMsg}
      />
      <Input
        label={"아이디"}
        name={"username"}
        type={"textLine"}
        value={usernameValue}
        onChange={usernameChangeHandler}
        onBlur={usernameBlurHandler}
        hasError={usernameHasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"비밀번호"}
        name={"password1"}
        type={"password"}
        value={password1Value}
        onChange={password1ChangeHandler}
        onBlur={password1BlurHandler}
        hasError={password1HasError}
        errorMsg={emptyErrorMsg}
      />
      <Input
        label={"비밀번호 확인"}
        name={"password2"}
        type={"password"}
        value={password2Value}
        onChange={password2ChangeHandler}
        onBlur={password2BlurHandler}
        hasError={password2HasError}
        errorMsg={emptyErrorMsg}
      />
    </>
  );
};

export default SignupForm;
