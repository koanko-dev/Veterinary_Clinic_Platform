import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Rating from "@mui/material/Rating";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { importImg } from "../../util/img";
import palette from "../../lib/styles/palette";

const ClinicCard = ({ clinic }) => {
  return (
    <Link to={`${clinic.clinic_name}`}>
      <ClinicCardBox>
        <ImgBox>
          <img src={importImg("cat9.jpg")}></img>
        </ImgBox>
        <ContentBox>
          <div>
            <small>
              <LocationOnIcon fontSize="small" />
              {clinic.address_area}
            </small>
            <h3>{clinic.clinic_name}</h3>
            <BioBox>{clinic.bio}</BioBox>
            <p>
              <span>{clinic.specialized_field}</span>
              <span>{clinic.specialized_species}</span>
            </p>
          </div>
          <RatingBox>
            <Rating
              size="small"
              precision={0.25}
              name="read-only"
              value={clinic.rating}
              readOnly
            />
          </RatingBox>
        </ContentBox>
      </ClinicCardBox>
    </Link>
  );
};

export default ClinicCard;

const ClinicCardBox = styled.li`
  height: 210px;
  list-style-type: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 20px;
  margin-bottom: 2rem;
  display: flex;
`;

const ImgBox = styled.div`
  height: 100%;
  flex-basis: 100px;
  flex-grow: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px 0 0 20px;
  }
`;

const ContentBox = styled.div`
  width: 480px;
  min-height: 150px;
  flex-basis: 100px;
  flex-grow: 3;
  padding: 2rem 1.5rem;
  position: relative;

  small {
    color: ${palette.gray[6]};
    font-size: 13px;

    svg {
      width: 1rem;
      position: relative;
      left: -2px;
      top: 4px;
    }
  }

  p {
    span {
      color: ${palette.point[0]};
      background-color: transparent;
      border: 1px solid ${palette.point[0]};
      padding: 6px 10px;
      border-radius: 2rem;
      box-sizing: border-box;
      margin-right: 4px;
      font-size: 13px;
    }
  }
`;

const RatingBox = styled.div`
  position: absolute;
  top: 2rem;
  right: 1.5rem;
`;

const BioBox = styled.p`
  margin-top: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
`;
