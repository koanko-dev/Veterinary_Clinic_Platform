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

import styled from "styled-components";
import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import Button from "../UI/Button";

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
    <SignupBox>
      <Wrapper>
        <SmallWrapper>
          <h2>회원가입</h2>
          {!group && (
            <LinkBox>
              <Link to="/auth?mode=signup&group=general">일반회원 가입</Link>
              <Link to="/auth?mode=signup&group=clinic">동물병원 가입</Link>
            </LinkBox>
          )}
          {group && (
            <Form method="post">
              <SignupForm checkValidation={checkSignupFormValidation} />
              {groupInfoForm}
              <ButtonBox>
                <Button
                  theme="outline"
                  type="button"
                  onClick={cancelHandler}
                  disabled={isSubmitting}
                >
                  뒤로가기
                </Button>
                <div>
                  <Link to="?mode=login">
                    <Button>로그인</Button>
                  </Link>
                  <Button theme="basic" disabled={isSubmitting | !formIsValid}>
                    {isSubmitting ? "회원가입 중..." : "회원가입"}
                  </Button>
                </div>
              </ButtonBox>
            </Form>
          )}
        </SmallWrapper>
      </Wrapper>
    </SignupBox>
  );
};

export default Signup;

const SignupBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;

const SmallWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 600px;

  h2 {
    margin-bottom: 2rem;
  }
`;

const LinkBox = styled.div`
  height: 300px;
  display: flex;
  justify-content: space-between;

  a {
    width: 49%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;

    border-radius: 20px;

    &:first-child {
      background-color: ${palette.yellow[0]};
    }

    &:nth-child(2) {
      background-color: ${palette.point[0]};
    }
  }
`;

const ButtonBox = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;
