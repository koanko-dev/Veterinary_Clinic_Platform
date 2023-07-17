import React from "react";

import styled from "styled-components";
import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";

import catImg from '../../assets/cat.png'

const HomeFirstSection = () => {
  return (
    <HomeFirstSectionBox>
      <Wrapper>
        <LeftSideWrapper>
          <MainTitleBox>
            <Title>
              <div>Veterinary</div>
              <div>Clinics in Seoul</div>
              <TitleTagImgBox>
                <img src='/static/images/cat.png' alt="title tag" />
              </TitleTagImgBox>
            </Title>
            <Sub>
              <div>The leading clinics in Seoul, top specialists,</div>
              <div>modern technology, proven medicines.</div>
            </Sub>
          </MainTitleBox>
          <ReviewBox>
            <div>img</div>
            <div>
              <span>{">"}100</span> Reviews
            </div>
          </ReviewBox>
        </LeftSideWrapper>
        <RightSideWrapper>
          <img src={catImg} alt="cat" />
        </RightSideWrapper>
      </Wrapper>
    </HomeFirstSectionBox>
  );
};

export default HomeFirstSection;

const HomeFirstSectionBox = styled.section`
  height: 680px;
  outline: red solid 1px;
`;

const Wrapper = styled(Responsive)`
  position: relative;
`;

const LeftSideWrapper = styled.div`
  position: absolute;
  height: 450px;
  left: 2rem;
  top: 6rem;
`;

const MainTitleBox = styled.div`
  position: relative;
`;

const Title = styled.div`
  div {
    font-weight: 600;
    font-size: 3rem;
  }
`;

const TitleTagImgBox = styled.span`
  position: absolute;
  right: 0;
  top: 0;
`;

const Sub = styled.div`
  margin-top: 1rem;
`;

const ReviewBox = styled.div`
  color: #ffffff;
  margin-top: 4rem;
  padding: 2rem;
  width: 300px;
  height: 200px;
  background-color: ${palette.point[0]};
  border-radius: 20px;

  span {
    font-size: 2.5rem;
    font-weight: 500;
  }
`;

const RightSideWrapper = styled.div``;
