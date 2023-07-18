import React from "react";
import ReactDOM from "react-dom";

import styled, { keyframes } from "styled-components";
import Responsive from "./Responsive";
import palette from "../../lib/styles/palette";

const Backdrop = (props) => {
  return <BackdropBox onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <ModalOverlayBox>{props.children}</ModalOverlayBox>;
};

const potalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        potalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        potalElement
      )}
    </>
  );
};

const fadein = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const BackdropBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
  animation: ${fadein} 0.2s;
`;

const PostSlideUp = keyframes`
0% {
  transform: translate(-50%, 10%);
  opacity: 0;
}
100% {
  transform: translate(-50%, 0);
  opacity: 1;
}
`;

const ModalOverlayBox = styled(Responsive)`
  position: fixed;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  overflow: scroll;
  max-height: calc(100vh - 24vh);
  color: ${palette.gray[8]};
  transition: all 1s ease-in-out;
  animation: ${PostSlideUp} 0.3s ease-out;
`;

export default Modal;
