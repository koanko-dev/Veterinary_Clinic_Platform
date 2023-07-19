import React, { useCallback, useEffect, useRef, useState } from "react";

import styled, { keyframes } from "styled-components";

const InfiniteLooper = ({ speed, direction, children }) => {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef();
  const innerRef = useRef();

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();

    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const instanceWidth = width / innerRef.current.children.length;

    if (width < parentWidth + instanceWidth) {
      setLooperInstances(looperInstances + Math.ceil(parentWidth / width));
    }
  }, [looperInstances]);

  useEffect(() => {
    setupInstances();
  }, []);

  return (
    <LooperDiv ref={outerRef}>
      <LooperInnerList ref={innerRef}>
        {[...Array(looperInstances)].map((_, ind) => (
          <LooperListInstance
            key={ind}
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
          </LooperListInstance>
        ))}
      </LooperInnerList>
    </LooperDiv>
  );
};

export default InfiniteLooper;

const slideAnimation = keyframes`
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
`;

const LooperDiv = styled.div`
  width: 100%;
  overflow: hidden;
`;

const LooperInnerList = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
`;

const LooperListInstance = styled.div`
  display: flex;
  width: max-content;

  animation: ${slideAnimation} linear infinite;
`;
