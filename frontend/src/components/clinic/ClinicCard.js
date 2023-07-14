import React from "react";
import { Link } from "react-router-dom";

const ClinicCard = ({
  clinicName,
  rating,
  specializedField,
  specializedSpecies,
}) => {
  return (
    <Link to={`${clinicName}`}>
      <div>
        <h3>{clinicName}</h3>
        <p>
          {specializedField}/{specializedSpecies}/{rating}
        </p>
      </div>
    </Link>
  );
};

export default ClinicCard;
