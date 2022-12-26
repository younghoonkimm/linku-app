import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { CategoriesType } from "../../../../App";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { Buttons } from "../../atom";

export interface HomeLinkCategoriesButtonProps {
  item: typeof CategoriesType;
  index: number;
}

const StyledButton = styled(Buttons)<{ last: boolean; checked: boolean }>`
  margin-right: ${(props) =>
    props.last ? `${widthPercentage(16)}px` : `${widthPercentage(6)}px`};
  color: ${(props) => (props.checked ? "#fff" : "#000")};
  background-color: ${(props) =>
    props.checked ? props.theme.mainColor : props.theme.mainBgColor};
  align-items: center;
  justify-content: center;
  padding: ${widthPercentage(4)}px ${widthPercentage(10)}px
    ${widthPercentage(4)}px;
  border-radius: ${widthPercentage(12)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.checked ? props.theme.mainColor : props.theme.borderColor};
`;

const CheckedButtonText = styled(Text)<{ checked: boolean }>`
  color: ${(props) => (props.checked ? "#fff" : props.theme.textDescColor)};
  font-size: ${fontPercentage(9)}px;
`;

function HomeLinkCategoriesButton({ item, onPress, tab, last }: any) {
  const { categoryName, _id } = item;

  const isChecked = tab === item._id;

  return (
    <StyledButton
      title={categoryName}
      onPress={onPress}
      last={last}
      checked={isChecked}
    >
      <CheckedButtonText checked={isChecked}>{categoryName}</CheckedButtonText>
    </StyledButton>
  );
}

export default HomeLinkCategoriesButton;
