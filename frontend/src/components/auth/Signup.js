import React, { useEffect, useState } from "react";
import SignupForm from "./SignupForm";
import {
  Form,
  Link,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import ClinicSignupForm from "./ClinicSignupForm";
import GeneralSignupForm from "./GeneralSignupForm";

const Signup = () => {
  const [signupFormIsValid, setSignupFormIsValid] = useState(false);
  const [clinicSignupFormIsValid, setClinicSignupFormIsValid] = useState(false);
  const [generalSignupFormIsValid, setGeneralSignupFormIsValid] =
    useState(false);

  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const group = searchParams.get("group");
  const isSubmitting = navigation.state === "submitting";

  const checkSignupFormValidation = (isValid) => {
    setSignupFormIsValid(isValid);
  };

  const checkClinicSignupFormValidation = (isValid) => {
    setClinicSignupFormIsValid(isValid);
  };

  const checkGeneralSignupFormValidation = (isValid) => {
    setGeneralSignupFormIsValid(isValid);
  };

  const cancelHandler = () => {
    navigate("/auth?mode=signup");
  };

  let groupInfoForm = null;
  let formIsValid = false;

  if (group === "clinic") {
    formIsValid = signupFormIsValid && clinicSignupFormIsValid;
    groupInfoForm = (
      <ClinicSignupForm checkValidation={checkClinicSignupFormValidation} />
    );
  } else if (group == "general") {
    formIsValid = signupFormIsValid && generalSignupFormIsValid;
    groupInfoForm = (
      <GeneralSignupForm checkValidation={checkGeneralSignupFormValidation} />
    );
  }

  return (
    <div>
      <h2>회원가입</h2>
      {!group && (
        <>
          <Link to="/auth?mode=signup&group=general">일반회원 가입</Link>
          <Link to="/auth?mode=signup&group=clinic">동물병원 가입</Link>
        </>
      )}
      {group && (
        <Form method="post">
          <SignupForm checkValidation={checkSignupFormValidation} />
          {groupInfoForm}
          <div>
            <Link to="?mode=login">로그인</Link>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button disabled={isSubmitting | !formIsValid}>
              {isSubmitting ? "회원가입중..." : "회원가입"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Signup;
