import React from "react";

import styled from "styled-components";

import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";
import { importImg } from "../../util/img";

const ServicesSection = () => {
  return (
    <ServicesSectionBox>
      <Wrapper>
        <h2>Our Services</h2>

        <BlueCardsBox>
          <FirstRow>
            <FirstRowBlueCard>
              <FirstImg src={importImg("s1.png")} />
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </FirstRowBlueCard>
            <FirstRowBlueCard>
              <SecongImg src={importImg("s2.png")} />
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </FirstRowBlueCard>
          </FirstRow>

          <SecondRow>
            <SecondRowBlueCard>
              <ThirdImg src={importImg("s3.png")} />
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </SecondRowBlueCard>
            <SecondRowBlueCard>
              <FourthImg src={importImg("s4.png")} />
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </SecondRowBlueCard>
            <SecondRowBlueCard>
              <FifthImg src={importImg("s5.png")} />
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </SecondRowBlueCard>
          </SecondRow>
        </BlueCardsBox>
      </Wrapper>
    </ServicesSectionBox>
  );
};

export default ServicesSection;

const ServicesSectionBox = styled.section`
  height: 780px;
`;

const Wrapper = styled(Responsive)`
  padding-top: 4rem;
  padding-bottom: 4rem;

  h2 {
    color: #000;
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 8px;
  }
`;

const BlueCardsBox = styled.div`
  img {
    position: relative;
    margin-bottom: 8px;
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BlueCard = styled.div`
  color: #fff;
  height: 100%;
  background-color: ${palette.point[0]};
  border-radius: 20px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const FirstRowBlueCard = styled(BlueCard)`
  width: 49%;
  height: 300px;
`;

const SecondRowBlueCard = styled(BlueCard)`
  width: 32%;
  height: 250px;

  &:last-child {
    background-color: ${palette.yellow[0]};
  }
`;

const FirstImg = styled.img`
  left: -4px;
  width: 60px;
`;

const SecongImg = styled.img`
  left: -8px;
  width: 65px;
`;

const ThirdImg = styled.img`
  left: -6px;
  width: 60px;
`;

const FourthImg = styled.img`
  left: -8px;
  width: 60px;
`;

const FifthImg = styled.img`
  left: -2px;
  width: 56px;
`;
