import React, { useEffect, useState } from "react";

import axios from "../../axios-post";
import styled from "styled-components";

import { getGroup, getUserId } from "../../util/auth";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";

const ClinicHome = () => {
  const myId = getUserId();
  const { data } = useLoaderData();
  const token = useRouteLoaderData("root");
  const group = getGroup();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerNum, setFollowerNum] = useState(null);

  useEffect(() => {
    const isFollowing =
      data.followers.filter((follower) => follower.user.id === +myId).length >
      0;
    setIsFollowing(isFollowing);
    setFollowerNum(data.followers.length);
  }, []);

  const followHandler = async () => {
    const clinicId = data.id;

    try {
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
    <ClinicHomeBox>
      <Wrapper>
        <h2>{data.clinic_name}</h2>
        <section>
          <h3>정보</h3>
          <div>
            <p>유저이름 : {data.user.username}</p>
            <p>이메일 : {data.user.email}</p>
          </div>
        </section>

        <section>
          <h3>동물병원 정보</h3>
          <div>
            <p>이름 : {data.clinic_name}</p>
            <p>소개 : {data.bio}</p>
            <p>주소 : {data.address}</p>
            <p>평점 : {data.rating}</p>
            <p>전문분야 :{data.specialized_field}</p>
            <p>전문동물 :{data.specialized_species}</p>
          </div>
        </section>

        <section>
          <Button theme="point" onClick={followHandler}>
            {isFollowing ? "언팔로우" : "팔로우"}
          </Button>
          <h3>팔로워</h3>
          <div>{followerNum}</div>
        </section>

        <section>
          <h3>병원 리뷰</h3>
          {group === "general" && (
            <Link to={`/reviews/new/${data.id}`}>리뷰 작성하기</Link>
          )}
          <div>
            {data.reviews.length > 0 &&
              data.reviews.map((review) => {
                return (
                  <div key={review.id}>
                    <Link to={`/reviews/${review.id}`}>{review.title}</Link>
                  </div>
                );
              })}
          </div>
        </section>
      </Wrapper>
    </ClinicHomeBox>
  );
};

export default ClinicHome;

export const loader = async ({ params }) => {
  const clinicName = params.name;
  try {
    const response = await axios.get(`clinics/${clinicName}/`);
    return response;
  } catch (err) {
    return err;
  }
};

const ClinicHomeBox = styled.section`
  padding-top: 2rem;
  padding-bottom: 12rem;
`;

const Wrapper = styled(Responsive)`
  h2 {
    margin-bottom: 2rem;
  }
`;
