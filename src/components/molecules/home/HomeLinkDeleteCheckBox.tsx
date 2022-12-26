import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import {
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { CheckBoxIcon } from "../../../components/svg";

const StyledCheckBoxContainer = styled.View`
  position: absolute;
  right: ${widthPercentage(18)}px;
  top: 50%;
  transform: ${`translateY(${widthPercentage(10.5)}px)`};
  align-self: center;
`;

const StyledCheckBox = styled.Pressable<{ isChecked: boolean }>`
  width: ${widthPercentage(18)}px;
  height: ${widthPercentage(18)}px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: ${(props) =>
    props.isChecked
      ? `${props.theme.redColor}`
      : `${props.theme.checkBoxBorderColor}`};
  border-radius: ${widthPercentage(18) / 2}px;
  background-color: ${(props) =>
    props.isChecked ? `${props.theme.redColor}` : `transparent`};
`;

function HomeLinkDeleteCheckBox({ onPress, isChecked }: any) {
  const [checked, setChecked] = useState(false);

  const onChecked = () => {
    onPress(!checked);
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    isChecked ? setChecked(true) : setChecked(false);
  }, [isChecked]);

  return (
    <StyledCheckBoxContainer>
      <StyledCheckBox isChecked={checked} onPress={onChecked}>
        {checked ? (
          <CheckBoxIcon
            width={widthPercentage(18)}
            height={heightPercentage(8)}
          />
        ) : null}
      </StyledCheckBox>
    </StyledCheckBoxContainer>
  );
}

export default HomeLinkDeleteCheckBox;
