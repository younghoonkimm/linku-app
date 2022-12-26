import React, { useEffect, useState } from "react";

import { widthPercentage } from "../../../hooks/useResponseSize";
import { BottomBlur } from "../../atom";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyledFloatingSubmitButton,
  StyledFloatingText,
} from "../../../style/common";
import { Keyboard } from "react-native";

interface FloatingSubmitButtonProps {
  onPress: () => void;
  text: string;
  isDisabled?: boolean;
  inputAccessoryViewID?: string;
}

function FloatingSubmitButton({
  onPress,
  text,
  isDisabled = false,
}: FloatingSubmitButtonProps) {
  const insets = useSafeAreaInsets();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        // setEditInputId("");
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <BottomBlur
      height={insets.bottom ? widthPercentage(100) + 34 : widthPercentage(100)}
      onClickOutside={() => {}}
    >
      {!isKeyboardVisible && (
        <StyledFloatingSubmitButton
          onPress={onPress}
          isDisabled={isDisabled}
          margin={insets.bottom}
        >
          <StyledFloatingText>{text}</StyledFloatingText>
        </StyledFloatingSubmitButton>
      )}
    </BottomBlur>
  );
}

export default FloatingSubmitButton;
