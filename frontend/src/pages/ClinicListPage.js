import React, { useEffect, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";

import axios from "../axios-post";
import styled from "styled-components";

import ClinicCard from "../components/clinic/ClinicCard";
import {
  areas,
  clinicCategories,
  petSpecies,
} from "../lib/resources/resources";
import Button from "../components/UI/Button";
import Responsive from "../components/UI/Responsive";

const ClinicListPage = () => {
  const { data } = useLoaderData();
  const [clinicList, setClinicList] = useState(data);
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData) {
      setClinicList(actionData.data);
    }
  }, [actionData]);

  let content = <p>검색된 동물병원이 없습니다.</p>;

  if (clinicList.length > 0) {
    content = clinicList.map((clinic) => {
      return (
        <ClinicCard
          key={clinic.id}
          clinicName={clinic.clinic_name}
          rating={clinic.rating}
          specializedField={clinic.specialized_field}
          specializedSpecies={clinic.specialized_species}
        />
      );
    });
  }

  return (
    <ClinicListPageBox>
      <Wrapper>
        <Form method="post">
          <select name="address_area">
            <option value="">-------</option>
            {areas.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="specialized_species">
            <option value="">-------</option>
            {petSpecies.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="specialized_field">
            <option value="">-------</option>
            {clinicCategories.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <select name="ordering">
            <option value="default">최신순으로 보기</option>
            <option value="rating_ascending">낮은별점순으로 보기</option>
            <option value="rating_descending">높은별점순으로 보기</option>
          </select>

          <Button theme="point" disabled={isSubmitting}>
            {isSubmitting ? "필터 적용중..." : "필터 적용"}
          </Button>
        </Form>

        <div>
          <ul>{content}</ul>
        </div>
      </Wrapper>
    </ClinicListPageBox>
  );
};

export default ClinicListPage;

export const loader = async () => {
  try {
    const response = await axios.get("clinics/");
    return response;
  } catch (err) {
    return err;
  }
};

export const action = async ({ request }) => {
  const data = await request.formData();

  const address_area = data.get("address_area");
  const specialized_species = data.get("specialized_species");
  const specialized_field = data.get("specialized_field");
  const ordering = data.get("ordering");

  let urlParams = "?";

  if (address_area) {
    urlParams += `address_area=${address_area}&`;
  }
  if (specialized_species) {
    urlParams += `specialized_species=${specialized_species}&`;
  }
  if (specialized_field) {
    urlParams += `specialized_field=${specialized_field}&`;
  }
  if (ordering) {
    urlParams += `ordering=${ordering}&`;
  }

  try {
    const filteredRes = await axios.get(`clinics/search/${urlParams}`);
    return filteredRes;
  } catch (err) {
    console.log("err", err);
  }
};

const ClinicListPageBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)``;
