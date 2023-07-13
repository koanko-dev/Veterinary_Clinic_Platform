import React from "react";

const Input = ({
  label,
  name,
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
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "password") {
    inputElement = (
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  } else if (type === "textBox") {
    inputElement = (
      <textarea name={name} value={value} onChange={onChange} onBlur={onBlur} />
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
      <select name={name} value={value} onChange={onChange} onBlur={onBlur}>
        <option value="" disabled hidden>
          -------
        </option>
        {optionElements}
      </select>
    );
  } else if (type === "number") {
    inputElement = (
      <input
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
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
