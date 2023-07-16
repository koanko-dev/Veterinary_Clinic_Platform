import React from "react";
import { Link } from "react-router-dom";

const ClinicList = ({ clinics }) => {
  return (
    <div>
      <h3>Clinics</h3>
      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id}>
            <Link to={`/clinics/${clinic.clinic_name}`}>
              {/* <img src={clinic.img} alt={clinic.clinic_name} /> */}
              <div>
                <h2>{clinic.clinic_name}</h2>
                <p>{clinic.rating}</p>
                <p>{clinic.address_area}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicList;
