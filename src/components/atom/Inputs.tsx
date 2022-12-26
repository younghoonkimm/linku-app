import React, { useRef } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../../../context";

interface InputsProps {
  name: string;
  text: string;
  setText: (value: string) => void;
  onSubmit?: () => void;
  [key: string]: any;
  style?: React.ReactNode;
}

const StyledTextInput = styled.TextInput<{
  style: React.ReactNode;
}>`
  width: 100%;
  color: ${(props) => props.theme.textDescColor};
`;

const Inputs = React.forwardRef(
  (
    { name, text, setText, onSubmit = () => {}, ...rest }: InputsProps,
    ref: any
  ) => {
    const handleChangeText = (text: string) => setText(text);
    const { darkMode } = useTheme();
    return (
      <StyledTextInput
        placeholderTextColor={
          darkMode === "dark" ? "#919191" : "rgb(194,194,194)"
        }
        selectionColor={darkMode ? "#6464FF" : "rgba(131, 120, 239, 1)"}
        ref={ref}
        value={text}
        onChangeText={handleChangeText}
        blurOnSubmit={true}
        onSubmitEditing={() => onSubmit()}
        {...rest}
      />
    );
  }
);

export default Inputs;
