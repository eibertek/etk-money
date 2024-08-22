import { useState } from "react";

export const ModalHook = () => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState("I'm the Modal Content");

  let handleModal = (content = "") => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, handleModal, modalContent };
};

export default ModalHook;