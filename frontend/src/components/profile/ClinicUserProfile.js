import React from "react";

const ClinicUserProfile = ({ userData }) => {
  return (
    <div>
      <section>
        <p>정보</p>
        <div>
          <p>유저이름 : {userData.user.username}</p>
          <p>이메일 : {userData.user.email}</p>
        </div>
      </section>

      <section>
        <p>동물병원 정보</p>
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
        <p>팔로워</p>
        <div>
          {userData.followers &&
            userData.followers.map((follower) => {
              return <p key={follower.id}>{follower.username}</p>;
            })}
        </div>
      </section>

      <section>
        <p>병원 리뷰</p>
        <div>
          {userData.reviews &&
            userData.reviews.map((review) => {
              return <p key={review.id}>{review.title}</p>;
            })}
        </div>
      </section>
    </div>
  );
};

export default ClinicUserProfile;
