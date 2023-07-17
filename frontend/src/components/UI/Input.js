import React from "react";

import styled from "styled-components";
import palette from "../../lib/styles/palette";

const Input = ({
  label,
  name,
  type,
  accept,
  value,
  onChange,
  onBlur,
  hasError,
  errorMsg,
  options,
}) => {
  let inputElement = null;

  if (type === "textLine") {
    inputElement = (
      <InputTag
        type="text"
        name={name}
        value={value}
        inValid={hasError}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "password") {
    inputElement = (
      <InputTag
        type="password"
        name={name}
        value={value}
        inValid={hasError}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "textBox") {
    inputElement = (
      <TextareaTag
        name={name}
        value={value}
        inValid={hasError}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "select" && options) {
    const optionElements = options.map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });

    inputElement = (
      <SelectTag name={name} value={value} onChange={onChange} onBlur={onBlur}>
        <option value="" disabled hidden>
          -------
        </option>
        {optionElements}
      </SelectTag>
    );
  } else if (type === "number") {
    inputElement = (
      <InputTag
        name={name}
        type="number"
        value={value}
        inValid={hasError}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "file" && accept) {
    inputElement = (
      <FileInputButton
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        onBlur={onBlur}
      ></FileInputButton>
    );
  }

  return (
    <InputDiv>
      <label>{label}</label>
      {inputElement}
      {hasError && <p>{errorMsg}</p>}
    </InputDiv>
  );
};

export default Input;

const invalid = (props) => `
  border: ${props.inValid && `1px solid rgba(255, 0, 0, 0.4);`}
  background-color: ${props.inValid && `#ff000015;`}
`;

const input = () => `
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  background-color: white;
  border: 1px solid ${palette.gray[3]};
  border-radius: 0.2rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: ${palette.yellow[1]};
    outline: none;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
  }
  &::placeholder {
    color: ${palette.gray[5]};
  }
`;

const InputTag = styled.input`
  height: calc(1.5em + 0.75rem + 2px);
  ${input}
  ${invalid}
`;

const TextareaTag = styled.textarea`
  height: calc((1.5em + 0.75rem + 2px) * 5);
  ${input}
  ${invalid}
`;

const SelectTag = styled.select`
  height: calc(1.5em + 0.75rem + 2px);
  ${input}
  ${invalid}
`;

const FileInputButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.2rem;
  color: ${palette.gray[8]};
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  border: none;
  border-radius: 0.2rem;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  background-color: ${palette.gray[1]};
  
  &:hover {
    background-color: ${palette.gray[2]};
  }
`;

const InputDiv = styled.div`
  margin-bottom: 32px;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    text-transform: capitalize;
  }
`;
