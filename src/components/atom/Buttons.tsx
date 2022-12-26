import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

interface ButtonProps {
  text?: string;
  onPress: (x?: any) => void;
  children?: React.ReactNode;
  style?: React.ReactNode;
  [key: string]: any;
}

const StyledTouchableOpacity = styled.TouchableOpacity<{
  style?: React.ReactNode;
}>``;

function Buttons({ text, children, onPress, ...rest }: ButtonProps) {
  return (
    <StyledTouchableOpacity onPress={onPress} {...rest} activeOpacity={1}>
      {text && <Text>{text}</Text>}
      {children}
    </StyledTouchableOpacity>
  );
}

export default Buttons;
