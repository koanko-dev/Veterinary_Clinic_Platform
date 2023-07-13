import React from "react";
import { Form, Link, useNavigation, useSearchParams } from "react-router-dom";

import useInput from "../../hooks/use-input";
import Input from "../UI/Input";

const isEmail = (value) => value.includes("@");
const isNotEmpty = (value) => value.trim() !== "";
const emailErrorMsg = "옳은 이메일 형식을 입력해주세요.";
const emptyErrorMsg = "값을 입력해주세요.";

const LoginForm = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

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

  // const submitHandler = (event) => {
  //   event.preventDefault();

  //   if (!formIsValid) {
  //     return;
  //   }

  //   resetEmail();
  //   resetPassword();
  // };

  // const emailClasses = emailHasError ? "emailStyle invalid" : "emailStyle";
  // const passwordClasses = passwordHasError
  //   ? "passwordStyle invalid"
  //   : "passwordStyle";

  return (
    <Form method="post">
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
        label={"비밀번호"}
        name={"password"}
        type={"password"}
        value={passwordValue}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        hasError={passwordHasError}
        errorMsg={emptyErrorMsg}
      />
      <div>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "회원가입" : "로그인"}
        </Link>
        <button disabled={isSubmitting | !formIsValid}>
          {isSubmitting ? "로그인중..." : "로그인"}
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
