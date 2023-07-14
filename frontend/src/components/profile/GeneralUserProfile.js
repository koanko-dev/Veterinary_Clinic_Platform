import React from "react";
import { Link } from "react-router-dom";

const GeneralUserProfile = ({ userData }) => {
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
        <h3>반려동물</h3>
        <div>
          <p>이름 : {userData.pet_name}</p>
          <p>종류 : {userData.pet_species}</p>
        </div>
      </section>

      <section>
        <h3>작성한 리뷰</h3>
        <div>
          {userData.reviews &&
            userData.reviews.length > 0 &&
            userData.reviews.map((review) => {
              return <p key={review.id}>{review.title}</p>;
            })}
        </div>
      </section>

      <section>
        <h3>팔로우하는 동물병원</h3>
        <div>
          {userData.following_clinics &&
            userData.following_clinics.length > 0 &&
            userData.following_clinics.map((following_clinic) => {
              return (
                <div key={following_clinic.id}>
                  <Link to={`/clinics/${following_clinic.clinic_name}`}>
                    {following_clinic.clinic_name}
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default GeneralUserProfile;
