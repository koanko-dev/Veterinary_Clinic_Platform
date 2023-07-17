import React from "react";

import styled from "styled-components";
import Responsive from "../UI/Responsive";
import palette from "../../lib/styles/palette";

const ServicesSection = () => {
  return (
    <ServicesSectionBox>
      <Wrapper>
        <h2>Our Services</h2>

        <BlueCardsBox>
          <FirstRow>
            <FirstRowBlueCard>
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </FirstRowBlueCard>
            <FirstRowBlueCard>
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </FirstRowBlueCard>
          </FirstRow>

          <SecondRow>
            <SecondRowBlueCard>
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </SecondRowBlueCard>
            <SecondRowBlueCard>
              <h4>Care</h4>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </SecondRowBlueCard>
            <SecondRowBlueCard>
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

const BlueCardsBox = styled.div``;

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
`;
