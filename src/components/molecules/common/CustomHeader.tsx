import { useNavigation } from "@react-navigation/native";

import React from "react";

import styled from "styled-components/native";

import { Buttons } from "../../atom";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";

const StyledHeaderContainer = styled.View`
  position: relative;
  padding: ${widthPercentage(24)}px 0 ${widthPercentage(11)}px;
  background-color: ${(props) => props.theme.mainBgColor};
  align-items: center;
`;

const StyledTitle = styled.Text`
  font-weight: 700;
  font-size: ${fontPercentage(15)}px;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledBackButton = styled(Buttons)`
  position: absolute;
  right: ${widthPercentage(16)}px;
  top: ${widthPercentage(27)}px;
  /* transform: ${`translateY(-${heightPercentage(50)}px)`}; */
`;

const StyledButtonText = styled.Text`
  font-size: ${fontPercentage(13)}px;
  font-weight: 400;
  color: ${(props) => props.theme.headerBackColor};
`;

function CustomHeader({ title }: { title?: string }) {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("Home");

  return (
    <StyledHeaderContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledBackButton onPress={onPress}>
        <StyledButtonText>닫기</StyledButtonText>
      </StyledBackButton>
    </StyledHeaderContainer>
  );
}

export default CustomHeader;
