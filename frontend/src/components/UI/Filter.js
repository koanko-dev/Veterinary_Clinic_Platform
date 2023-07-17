import React from "react";

import styled from "styled-components";
import palette from "../../lib/styles/palette";

const Filter = ({ filterData }) => {
  return (
    <FilterBox>
      {filterData.map((data) => (
        <SelectEl name={data.name} key={data.name}>
          <option value="">{data.defaultText}</option>
          {data.optionValues.map((optionValue, index) => {
            return (
              <option key={optionValue} value={optionValue}>
                {data.optionLabel[index]}
              </option>
            );
          })}
        </SelectEl>
      ))}
    </FilterBox>
  );
};

export default Filter;

const FilterBox = styled.div`
  display: flex;
`;

const SelectEl = styled.select`
  flex: 1;
  margin: 0 2px;
  height: calc(1.5em + 0.75rem + 2px);
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: white;
  border: 1px solid ${palette.gray[3]};
  border-radius: 2rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: ${palette.gray[7]};

  &:focus {
    border-color: ${palette.yellow[1]};
    outline: none;
    box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
  }
  &::placeholder {
    color: ${palette.gray[5]};
  }
`;
