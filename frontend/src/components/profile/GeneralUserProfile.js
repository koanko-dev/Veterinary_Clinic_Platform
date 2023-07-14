import React from "react";

const GeneralUserProfile = ({ userData }) => {
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
        <p>반려동물</p>
        <div>
          <p>이름 : {userData.pet_name}</p>
          <p>종류 : {userData.pet_species}</p>
        </div>
      </section>

      <section>
        <p>작성한 리뷰</p>
        <div>
          {userData.reviews &&
            userData.reviews.map((review) => {
              return <p key={review.id}>{review.title}</p>;
            })}
        </div>
      </section>

      <section>
        <p>팔로우하는 동물병원</p>
        <div>
          {userData.following_clinics &&
            userData.following_clinics.map((following_clinic) => {
              return (
                <p key={following_clinic.id}>{following_clinic.clinic_name}</p>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default GeneralUserProfile;
