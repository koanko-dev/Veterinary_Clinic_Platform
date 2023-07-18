import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import ReviewCard from "../review/ReviewCard";
import ClinicCard from "../clinic/ClinicCard";

const GeneralUserProfile = ({ userData }) => {
  return (
    <GeneralUserProfileBox>
      <Wrapper>
        <h2>General Member Profile</h2>

        <section>
          <h3>정보</h3>
          <div>
            <p>유저이름 : {userData.user.username}</p>
            <p>이메일 : {userData.user.email}</p>
          </div>
        </section>

        <section>
          <h3>반려동물</h3>
          <div>
            <p>이름 : {userData.pet_name}</p>
            <p>종류 : {userData.pet_species}</p>
          </div>
        </section>

        <ReviewSection>
          <h3>작성한 리뷰</h3>
          <ul>
            {userData.user.reviews &&
              userData.user.reviews.length > 0 &&
              userData.user.reviews.map((review) => {
                return (
                  <Link key={review.id} to={`/reviews/${review.id}`}>
                    <ReviewCard review={review} />
                  </Link>
                );
              })}
          </ul>
        </ReviewSection>

        <section>
          <h3>팔로우하는 동물병원</h3>
          <div>
            {userData.following_clinics &&
              userData.following_clinics.length > 0 &&
              userData.following_clinics.map((following_clinic) => {
                return (
                    <Link key={following_clinic.id} to={`/clinics/${following_clinic.clinic_name}`}>
                      <ClinicCard clinic={following_clinic} linkDisable/>
                    </Link>
                );
              })}
          </div>
        </section>
      </Wrapper>
    </GeneralUserProfileBox>
  );
};

export default GeneralUserProfile;

const GeneralUserProfileBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;

  h3 {
    margin-bottom: 4px;
  }

  section {
    margin-bottom: 2rem;
  }
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;

const ReviewSection = styled.section`
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;
