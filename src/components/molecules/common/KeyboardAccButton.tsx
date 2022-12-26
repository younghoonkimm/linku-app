import React from "react";
import {
  StyledFloatingSubmitButton,
  StyledFloatingText,
  StyledKeyboardAcc,
} from "../../../style/common";
import KeyboardAcc from "../../atom/KeyboardAcc";

function KeyboardAccButton({ onSubmit, text, isDisabled }: any) {
  return (
    <KeyboardAcc>
      <StyledKeyboardAcc>
        <StyledFloatingSubmitButton
          onPress={onSubmit}
          margin={20}
          isDisabled={isDisabled}
        >
          <StyledFloatingText>{text}</StyledFloatingText>
        </StyledFloatingSubmitButton>
      </StyledKeyboardAcc>
    </KeyboardAcc>
  );
}

export default KeyboardAccButton;
