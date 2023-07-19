import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

import axios from "../../axios-post";
import styled from "styled-components";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import { getGroup, getUserId } from "../../util/auth";
import Button from "../UI/Button";
import Responsive from "../UI/Responsive";
import { importImg } from "../../util/img";
import { Divider, Rating } from "@mui/material";
import palette from "../../lib/styles/palette";
import ReviewCard from "../review/ReviewCard";

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
        <ClinicHeaderRow>
          <div>
            <h2>{data.clinic_name}</h2>
            <RatingBox>
              <span>평균 별점 : {data.rating}</span>
              <p>
                <Rating
                  size="small"
                  precision={0.25}
                  name="read-only"
                  value={data.rating}
                  readOnly
                />
              </p>
            </RatingBox>
          </div>
        </ClinicHeaderRow>

        <InfoRow>
          <div>
            <span>+ {followerNum} followers</span>
            {group === "general" && (
              <Button size="small" theme="outlineBlack" onClick={followHandler}>
                {isFollowing ? "언팔로우" : "팔로우"}
              </Button>
            )}
          </div>

          <p>
            <span>
              <LocationOnOutlinedIcon color="action" />
            </span>
            서울, {data.address_area}
          </p>
          <p>
            <span>
              <VaccinesOutlinedIcon color="action" />
            </span>
            {data.specialized_field}
          </p>
          <p>
            <span>
              <LocalOfferOutlinedIcon color="action" />
            </span>
            {data.specialized_species}
          </p>
        </InfoRow>

        <ImageRow>
          <img src={importImg("cat6.jpg")} />
        </ImageRow>

        <OverviewRow>
          <h4>
            <span>Overview</span> | <span>What's Included</span> |{" "}
            <span>Clinic details</span>
          </h4>
          <OverviewBox>
            <OverviewBoxFirstRow>
              <div>
                <SvgSpan>
                  <CalendarMonthOutlinedIcon />
                </SvgSpan>
                <h5>동물병원 영업시간</h5>
                <p>평일 오전 09:00 ~ 18:00 / 12:30 - 13:30 휴게시간</p>
                <p>주말 오전 11:00 ~ 15:00 / 12:30 - 13:30 휴게시간</p>
              </div>
              <div>
                <SvgSpan>
                  <AssignmentOutlinedIcon />
                </SvgSpan>
                <h5>클리닉 전문 분야</h5>
                <p>#동물병원 #고양이동물병원 #강동구동물병원 #고양이전문</p>
                <p>#외과전문동물병원 #동물병원</p>
              </div>
            </OverviewBoxFirstRow>
            <OverviewBoxSecondRow>
              <div>
                <SvgSpan>
                  <TaskAltOutlinedIcon />
                </SvgSpan>
                <h5>다른 클리닉과의 차별화</h5>
                <p>
                  강동구 천호동에 위치한 CH 동물병원입니다. 2003년 개원 후
                  꾸준히 고양이 강아지 치료에 대해 투자와 연구를 하는
                  병원입니다. 후회없는 최선를 다하는 동물병원이 되겠습니다.
                </p>
              </div>
              <div>
                <SvgSpan>
                  <PeopleAltOutlinedIcon />
                </SvgSpan>
                <h5>이벤트, 혜택</h5>
                <p>
                  보호자는 안심하고 반려동물은 행복한 이벤트!<br></br>
                  진료는 비예약 진료도 가능하나, 예약 우선 진료로 시행되며 수술
                  및 세미나 등으로 시간 변경합니다.
                </p>
              </div>
            </OverviewBoxSecondRow>
            {/* <span>{data.address}</span> */}
          </OverviewBox>
        </OverviewRow>

        <Divider />

        <BioRow>
          <h4>Clinic Bio</h4>
          <p>{data.bio}</p>
        </BioRow>

        <Divider />

        <ReviewRow>
          <div>
            <h4>Clinic Reviews</h4>
            {group === "general" && (
              <Link to={`/reviews/new/${data.id}`}>
                <Button size="small" theme="point">
                  리뷰 작성하기
                </Button>
              </Link>
            )}
          </div>

          <ul>
            {data.reviews.length > 0 &&
              data.reviews.map((review) => {
                return (
                  <Link to={`/reviews/${review.id}`}>
                    <ReviewCard key={review.id} review={review}>
                      {review.title}
                    </ReviewCard>
                  </Link>
                );
              })}
          </ul>
        </ReviewRow>
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

const Wrapper = styled(Responsive)``;

const ClinicHeaderRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  position: relative;

  h2 {
    margin-right: 1rem;
  }
`;

const RatingBox = styled.p`
  margin-top: 6px;
  color: ${palette.gray[6]};

  p {
    position: relative;
    display: inline-block;
    top: 3px;
    left: 5px;
  }
`;

const InfoRow = styled.section`
  display: flex;
  margin-bottom: 1.5rem;
  position: relative;

  div {
    position: absolute;
    right: 0;
    top: 0;

    span {
      margin-right: 1rem;
      color: ${palette.gray[7]};
    }
  }

  p {
    margin-right: 1rem;

    span {
      margin-right: 3px;

      svg {
        width: 19px;
        position: relative;
        top: 6px;
      }
    }
  }
`;

const ImageRow = styled.section`
  height: 520px;
  img {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
  }
`;

const OverviewRow = styled.section`
  margin-top: 2rem;
  margin-bottom: 1.5rem;

  h4 {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: ${palette.gray[5]};

    span {
      padding: 0 1rem;

      &:first-child {
        padding-left: 0;
        color: ${palette.point[3]};
      }
    }
  }
`;

const OverviewBox = styled.section`
  h5 {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 4px;
  }
`;

const OverviewBoxFirstRow = styled.section`
  display: flex;
  margin-bottom: 1.5rem;

  div {
    position: relative;
    padding: 0px 3rem;
    flex: 1;

    span {
      position: absolute;
      left: 0;
    }
    p {
      font-size: 14px;
      color: ${palette.gray[6]};
    }
  }
`;

const OverviewBoxSecondRow = styled.section`
  display: flex;

  div {
    position: relative;
    padding: 0px 3rem;
    flex: 1;

    span {
      position: absolute;
      left: 0;
    }
    p {
      font-size: 14px;
      color: ${palette.gray[6]};
    }
  }
`;

const BioRow = styled.section`
  margin: 2.5rem 0 4rem;
  h4 {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const ReviewRow = styled.section`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2.5rem 0 1.2rem;

    h4 {
      font-weight: 400;
      font-size: 1.2rem;
    }
  }

  ul {
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
  }
`;

const SvgSpan = styled.span`
  margin-right: 3px;
  svg {
    width: 35px;
    position: relative;
    top: 3px;
    fill: ${palette.point[3]};
  }
`;
