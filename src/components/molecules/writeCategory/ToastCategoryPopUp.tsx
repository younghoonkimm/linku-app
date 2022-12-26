import React from "react";
import styled from "styled-components/native";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { ToastBubbleIcon } from "../../svg";

import useInsetHeights from "../../../hooks/useInsetHeights";

const StyledToastBubble = styled.View<{ headerHeight: number }>`
  position: absolute;
  /* align-items: center;
  justify-content: center; */
  left: ${widthPercentage(55)}px;

  top: ${(props) => `${props.headerHeight + 20 + heightPercentage(53)}px`};
  width: ${widthPercentage(176)}px;
  height: ${heightPercentage(36)}px;

  z-index: 99999;
  display: flex;
  flex: 1;
`;

const StyledToastText = styled.Text`
  position: absolute;
  left: ${widthPercentage(27)}px;
  top: ${heightPercentage(10.8)}px;
  font-size: ${fontPercentage(10, true)}px;
  color: #fff;
  z-index: 22;
`;

function ToastCategoryPopUp() {
  const { insetAndHeaderHeight, top } = useInsetHeights();

  return (
    <StyledToastBubble
      headerHeight={
        top > 20
          ? insetAndHeaderHeight
          : insetAndHeaderHeight + widthPercentage(10)
      }
    >
      <StyledToastText>컨텐츠를 누르면 편집 가능합니다.</StyledToastText>
      <ToastBubbleIcon
        width={widthPercentage(176)}
        height={heightPercentage(36)}
      />
    </StyledToastBubble>
  );
}

export default ToastCategoryPopUp;
