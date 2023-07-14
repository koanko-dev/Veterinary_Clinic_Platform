import React from "react";

import { Link } from "react-router-dom";

const ClinicUserProfile = ({ userData }) => {
  return (
    <div>
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
        <h3>팔로워</h3>
        <div>{userData.followers.length}</div>
      </section>

      <section>
        <h3>병원 리뷰</h3>
        <div>
          {userData.reviews.length > 0 ? (
            userData.reviews.map((review) => {
              return (
                <p key={review.id}>
                  <Link to={`/reviews/${review.id}`}>{review.title}</Link>
                </p>
              );
            })
          ) : (
            <p>작성된 리뷰가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClinicUserProfile;
