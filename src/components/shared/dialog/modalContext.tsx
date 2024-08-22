import React, { createContext } from "react";

const ModalContext = createContext(false);

const ModalProvider = ModalContext.Provider;

export { ModalContext, ModalProvider };