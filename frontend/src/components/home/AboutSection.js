import React from "react";

import styled from "styled-components";
import Responsive from "../UI/Responsive";
import { importImg } from "../../util/img";

const AboutSection = () => {
  return (
    <AboutSectionBox>
      <Wrapper>
        <BlackBackgroundCard>
          <h2>About us</h2>
          <BlockBox>
            <FirstCol>
              <div>img</div>
              <p>
                Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                askdfkasfaiksdf
              </p>
            </FirstCol>
            <SecondCol>
              <Card>
                <div>
                  <img src={importImg("emozi1.png")} />
                </div>
                <h4>Care</h4>
                <p>
                  Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                  askdfkasfaiksdf
                </p>
              </Card>
              <Card>
                <div>
                  <img src={importImg("emozi2.png")} />
                </div>
                <h4>Care</h4>
                <p>
                  Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                  askdfkasfaiksdf
                </p>
              </Card>
            </SecondCol>
            <ThirdCol>
              <Card>
                <div>
                  <img src={importImg("emozi3.png")} />
                </div>
                <h4>Care</h4>
                <p>
                  Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                  askdfkasfaiksdf
                </p>
              </Card>
              <Card>
                <div>
                  <img src={importImg("emozi4.png")} />
                </div>
                <h4>Care</h4>
                <p>
                  Provide askdjf askglxk sdsdk dksj dj s zicxmw jkxs the aasdfkk
                  askdfkasfaiksdf
                </p>
              </Card>
            </ThirdCol>
          </BlockBox>
        </BlackBackgroundCard>
      </Wrapper>
    </AboutSectionBox>
  );
};

export default AboutSection;

const AboutSectionBox = styled.section`
  height: 600px;
`;

const Wrapper = styled(Responsive)`
  position: relative;
`;

const BlackBackgroundCard = styled.div`
  position: absolute;
  top: -2rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 40px;
  padding: 2rem;
  padding-bottom: 4rem;

  h2 {
    color: #fff;
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 8px;
  }
`;

const BlockBox = styled.div`
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
`;

const FirstCol = styled.div`
  background-color: #fff;
  border-radius: 20px;
  flex-basis: 420px;
  height: 100%;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
`;
const SecondCol = styled.div`
  flex-basis: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 1.5rem;
`;

const ThirdCol = styled.div`
  width: 100%;
  height: 100%;
  flex-basis: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 100%;
  height: 47%;
  background-color: #fff;
  border-radius: 20px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 50px;
    height: 50px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
