import React from "react";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import styled from "styled-components/native";

const StyledAccView = styled(KeyboardAccessoryView)`
  flex: 1;
  background: ${(props) => props.theme.mainBgColor};
`;

function KeyboardAcc({ children }: { children: React.ReactNode }) {
  return (
    <StyledAccView hideBorder animateOn="ios" bumperHeight={40}>
      {children}
    </StyledAccView>
  );
}

export default KeyboardAcc;
