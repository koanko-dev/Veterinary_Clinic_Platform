import React from "react";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";
const emailErrorMsg = "옳은 이메일 형식을 입력해주세요.";
const emptyErrorMsg = "값을 입력해주세요.";

const LoginForm = () => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(emailValue, passwordValue);

    resetEmail();
    resetPassword();
  };

  const emailClasses = emailHasError ? "emailStyle invalid" : "emailStyle";
  const passwordClasses = passwordHasError
    ? "passwordStyle invalid"
    : "passwordStyle";

  return (
    <form onSubmit={submitHandler}>
      <Input
        label={"이메일"}
        type={"textLine"}
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        hasError={emailHasError}
        errorMsg={emailErrorMsg}
      />
      <Input
        label={"비밀번호"}
        type={"password"}
        value={passwordValue}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        hasError={passwordHasError}
        errorMsg={emptyErrorMsg}
      />
      <div>
        <button disabled={!formIsValid}>로그인</button>
      </div>
    </form>
  );
};

export default LoginForm;
