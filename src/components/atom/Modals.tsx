import React, { Dispatch, SetStateAction } from "react";
import Modal from "react-native-modal";

interface ModalsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
  animationIn?: any;
  animationOut?: any;
  [key: string]: any;
}
function Modals({
  isOpen,
  setIsOpen,
  children,
  animationIn = "slideInUp",
  animationOut = "slideOutDown",
  ...props
}: ModalsProps) {
  const modalClose = () => setIsOpen(false);

  return (
    <Modal
      isVisible={isOpen}
      animationIn={animationIn}
      animationOut={animationOut}
      onBackdropPress={modalClose}
      {...props}
      useNativeDriver
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={450}
      hideModalContentWhileAnimating={true}
      style={{ margin: 0 }}
    >
      {children}
    </Modal>
  );
}

export default Modals;
