import React, { useEffect, useState } from "react";

import axios from "../../axios-post";
import { getAuthToken, getUserId } from "../../util/auth";
import { Link } from "react-router-dom";

const ClinicUserProfile = ({ userData }) => {
  const myId = getUserId();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerNum, setFollowerNum] = useState(null);

  useEffect(() => {
    const isFollowing =
      userData.followers.filter((follower) => follower.user.id === +myId)
        .length > 0;
    setIsFollowing(isFollowing);
    setFollowerNum(userData.followers.length);
  }, []);

  const followHandler = async () => {
    const clinicId = userData.id;

    try {
      const token = getAuthToken();
      await axios.post(
        `accounts/follow/${clinicId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (isFollowing) {
        setFollowerNum(followerNum - 1);
      } else {
        setFollowerNum(followerNum + 1);
      }

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
    }
  };

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
        <button onClick={followHandler}>
          {isFollowing ? "언팔로우" : "팔로우"}
        </button>
        <h3>팔로워</h3>
        <div>{followerNum}</div>
      </section>

      <section>
        <h3>병원 리뷰</h3>
        <div>
          {userData.reviews.length > 0 &&
            userData.reviews.map((review) => {
              return (
                <div key={review.id}>
                  <Link to={`/reviews/${review.id}`}>{review.title}</Link>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default ClinicUserProfile;
