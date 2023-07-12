import React, { useState } from "react";

const ModalContext = React.createContext({
  isShow: false,
  onShowModal: () => {},
  onCloseModal: () => {},
});

export const ModalContextProvider = (props) => {
  const [isShow, setIsShow] = useState(false);

  const showModalHandler = () => {
    setIsShow(true);
  };

  const closeModalHandler = () => {
    setIsShow(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isShow: isShow,
        onShowModal: showModalHandler,
        onCloseModal: closeModalHandler,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;