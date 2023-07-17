import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Responsive from "./Responsive";

const Backdrop = (props) => {
  return <BackdropBox onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <Wrapper>
      <ModalOverlayBox>
        <ModalOverlayContent>{props.children}</ModalOverlayContent>
      </ModalOverlayBox>
    </Wrapper>
  );
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

const BackdropBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Wrapper = styled(Responsive)``;

const ModalOverlayBox = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
`;

const ModalOverlayContent = styled.div``;

export default Modal;
