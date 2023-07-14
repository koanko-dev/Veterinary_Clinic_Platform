import React from "react";
import { useLoaderData } from "react-router-dom";

import axios from "../axios-post";
import ClinicCard from "../components/clinic/ClinicCard";

const ClinicListPage = () => {
  const { data } = useLoaderData();
  const clinicList = data;

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

  return <div>{content}</div>;
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
