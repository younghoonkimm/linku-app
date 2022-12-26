import React from "react";
import styled from "styled-components/native";
import Buttons from "./Buttons";

interface RadioButtonsProps {
  data?: any;
  title: any;
  onPress: () => void;
  style?: React.ReactNode;
}

const StyledRadioContainer = styled.View<{
  style: React.ReactNode;
}>`
  height: 30px;
`;

function RadioButtons({ data, title, onPress, style }: RadioButtonsProps) {
  return (
    <StyledRadioContainer>
      {data ? (
        data.map((value: any) => (
          <Buttons onPress={onPress} text={value[title]} style={style} />
        ))
      ) : (
        <Buttons onPress={onPress} text={title} style={style} />
      )}
    </StyledRadioContainer>
  );
}

export default RadioButtons;
