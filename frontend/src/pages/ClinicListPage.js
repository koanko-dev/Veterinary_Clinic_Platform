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
import Filter from "../components/UI/Filter";

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
      return <ClinicCard key={clinic.id} clinic={clinic} />;
    });
  }

  const filter = [
    {
      name: "address_area",
      defaultText: "지역 선택",
      optionValues: areas,
      optionLabel: areas,
    },
    {
      name: "specialized_species",
      defaultText: "동물 종류 선택",
      optionValues: petSpecies,
      optionLabel: petSpecies,
    },
    {
      name: "specialized_field",
      defaultText: "진료 분야 선택",
      optionValues: clinicCategories,
      optionLabel: clinicCategories,
    },
    {
      name: "ordering",
      defaultText: "최신순으로 보기",
      optionValues: ["rating_ascending", "rating_descending"],
      optionLabel: ["낮은 별점순으로 보기", "높은 별점순으로 보기"],
    },
  ];

  return (
    <ClinicListPageBox>
      <Wrapper>
        <h2>Search Clinic, Make an Appointment</h2>
        <Form method="post">
          <Filter filterData={filter} />

          <ButtonBox>
            <Button theme="point" disabled={isSubmitting}>
              {isSubmitting ? "필터 적용중..." : "필터 적용"}
            </Button>
          </ButtonBox>
        </Form>

        <ContentBox>
          <ul>{content}</ul>
        </ContentBox>
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

  h2 {
    font-weight: 400;
    text-align: center;
    margin-bottom: 4rem;
  }
`;

const Wrapper = styled(Responsive)``;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ContentBox = styled.section`
  margin-top: 4rem;
`;
