import React from "react";

const Input = ({
  label,
  type,
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
      <input type={type} value={value} onChange={onChange} onBlur={onBlur} />
    );
  } else if (type === "password") {
    inputElement = (
      <input type={type} value={value} onChange={onChange} onBlur={onBlur} />
    );
  } else if (type === "textBox") {
    inputElement = (
      <textarea type={type} value={value} onChange={onChange} onBlur={onBlur} />
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
      <select value={value} onChange={onChange} onBlur={onBlur}>
        <option value="" defaultValue disabled hidden>
          -------
        </option>
        {optionElements}
      </select>
    );
  } else if (type === "number") {
    inputElement = (
      <input type={type} value={value} onChange={onChange} onBlur={onBlur} />
    );
  }

  return (
    <div>
      <p>
        <label>{label}</label>
      </p>
      <p>{inputElement}</p>
      {hasError && <p>{errorMsg}</p>}
    </div>
  );
};

export default Input;
