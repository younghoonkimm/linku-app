import React from "react";

import styled from "styled-components/native";
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from "../../../hooks/useResponseSize";
import { Buttons } from "../../../components/atom";
import { sortOptionLists } from "../../../helper/home";
import { CheckIcons } from "../../../components/svg";
import { flexRowAlignCenter } from "../../../style/common";

const StyledHomeSortModalContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${heightPercentage(168)}px;
  border-top-left-radius: ${widthPercentage(18)}px;
  border-top-right-radius: ${widthPercentage(18)}px;
  padding: ${heightPercentage(18)}px ${widthPercentage(16)}px
    ${heightPercentage(12)}px;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const StyledButtonContainer = styled.View<{
  isActive: boolean;
  isLast: boolean;
}>`
  ${flexRowAlignCenter}
  justify-content: space-between;

  height: ${heightPercentage(39)}px;

  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isLast ? "transparent" : "rgba(243,243,243,1)"};
`;

const StyledTitle = styled.Text`
  font-weight: 600;
  font-size: ${fontPercentage(15)}px;
  margin-bottom: ${heightPercentage(10)}px;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledButtons = styled(Buttons)<{ isActive: boolean; isLast: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${heightPercentage(39)}px;
  width: 100%;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isLast ? "transparent" : props.theme.homeSortModalBoder};
`;

const StyledButtonText = styled.Text<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.mainColor : "rgba(145,145,145,1)"};
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
`;

function HomeSortModal({ sortOption, setSortOption }: any) {
  return (
    <StyledHomeSortModalContainer>
      <StyledTitle>정렬</StyledTitle>

      {sortOptionLists.map((option, index) => (
        <StyledButtonContainer
          key={option.value}
          isActive={sortOption === option.value}
          isLast={index === sortOptionLists.length - 1}
        >
          <StyledButtons
            onPress={() => setSortOption(option.value)}
            isLast={index === sortOptionLists.length - 1}
          >
            <StyledButtonText isActive={sortOption === option.value}>
              {option.text}
            </StyledButtonText>
            {sortOption === option.value ? (
              <CheckIcons
                width={widthPercentage(18)}
                height={heightPercentage(18)}
              />
            ) : null}
          </StyledButtons>
        </StyledButtonContainer>
      ))}
    </StyledHomeSortModalContainer>
  );
}

export default HomeSortModal;
