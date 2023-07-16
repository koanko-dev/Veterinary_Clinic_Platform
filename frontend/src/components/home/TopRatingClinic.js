import React from "react";

import styled from "styled-components";
import Responsive from "../UI/Responsive";

const TopRatingClinic = () => {
  return (
    <TopRatingClinicBox>
      <Wrapper>
        <ImgCard>
          <BlackCover>
            <h4>Meet Top Rating Clinic!</h4>
          </BlackCover>
        </ImgCard>
      </Wrapper>
    </TopRatingClinicBox>
  );
};

export default TopRatingClinic;

const TopRatingClinicBox = styled.section`
  height: 440px;
  outline: red solid 1px;
  margin-top: 2rem;
`;

const Wrapper = styled(Responsive)`
  padding: 0;
`;

const ImgCard = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80");
  background-repeat: no-repeat;
  background-position: 0 40%;
  background-size: cover;
  border-radius: 40px;
  padding: 2rem;
  position: relative;
`;

const BlackCover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    font-size: 4rem;
    font-weight: 600;
    color: #fff;
  }
`;
