import React, { useEffect } from "react";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";

import axios from "../../axios-post";
import styled from "styled-components";

import useInput from "../../hooks/use-input";
import { petSpecies } from "../../lib/resources/resources";
import Input from "../UI/Input";
import { getAuthToken } from "../../util/auth";
import Button from "../UI/Button";

const isNotEmpty = (value) => value.trim() !== "";
const isCategory = (value) => petSpecies.includes(value);
const emptyErrorMsg = "값을 입력해주세요.";
const valueErrorMsg = "옳은 값을 입력해주세요.";

const ArticleForm = ({ method, article }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
    setDefaultValueHandler: setDefaultContentValueHandler,
  } = useInput(isNotEmpty);

  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
    setDefaultValueHandler: setDefaultCategoryValueHandler,
  } = useInput(isCategory);

  useEffect(() => {
    setDefaultTitleValueHandler(article ? article.title : "");
    setDefaultContentValueHandler(article ? article.content : "");
    setDefaultCategoryValueHandler(article ? article.category : "");
  }, []);

  let formIsValid = false;

  if (titleIsValid && contentIsValid && categoryIsValid) {
    formIsValid = true;
  }

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
        label={"반려동물 종류"}
        name={"category"}
        type={"select"}
        options={petSpecies}
        value={categoryValue}
        onChange={categoryChangeHandler}
        onBlur={categoryBlurHandler}
        hasError={categoryHasError}
        errorMsg={valueErrorMsg}
      />

      <ButtonBox>
        <Button
          theme="outlineBlack"
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button theme="basic" disabled={!formIsValid | isSubmitting}>
          {isSubmitting ? "저장중..." : "저장"}
        </Button>
      </ButtonBox>
    </Form>
  );
};

export default ArticleForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const articleData = {
    title: data.get("title"),
    // img: data.get("img"),
    content: data.get("content"),
    category: data.get("category"),
  };

  const token = getAuthToken();

  if (method === "PUT") {
    // Edit article
    const articleId = params.anum;

    try {
      await axios.put(`articles/${articleId}/`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/articles");
    } catch (err) {
      console.log("err", err);
      return response;
    }
  } else {
    // New article
    try {
      await axios.post(`articles/`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return redirect("/articles");
    } catch (err) {
      console.log("err", err);
      return response;
    }
  }
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
