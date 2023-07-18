import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import ReviewCard from "../review/ReviewCard";

const ClinicUserProfile = ({ userData }) => {
  return (
    <ClinicUserProfileBox>
      <Wrapper>
        <h2>Clinic Member Profile</h2>

        <section>
          <h3>정보</h3>
          <div>
            <p>유저이름 : {userData.user.username}</p>
            <p>이메일 : {userData.user.email}</p>
          </div>
        </section>

        <section>
          <h3>동물병원 정보</h3>
          <div>
            <p>이름 : {userData.clinic_name}</p>
            <p>소개 : {userData.bio}</p>
            <p>주소 : {userData.address}</p>
            <p>평점 : {userData.rating}</p>
            <p>전문분야 :{userData.specialized_field}</p>
            <p>전문동물 :{userData.specialized_species}</p>
          </div>
        </section>

        <section>
          <h3>팔로워 수</h3>
          <div>{userData.followers.length}</div>
        </section>

        <ReviewSection>
          <h3>병원 리뷰</h3>
          <ul>
            {userData.reviews.length > 0 ? (
              userData.reviews.map((review) => {
                return (
                  <Link key={review.id} to={`/reviews/${review.id}`}>
                    <ReviewCard review={review} />
                  </Link>
                );
              })
            ) : (
              <p>작성된 리뷰가 없습니다.</p>
            )}
          </ul>
        </ReviewSection>

      </Wrapper>
    </ClinicUserProfileBox>
  );
};

export default ClinicUserProfile;

const ClinicUserProfileBox = styled.section`
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