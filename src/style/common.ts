import { Buttons } from "../components/atom";
import { widthPercentage, fontPercentage } from "../hooks/useResponseSize";
import { css } from "styled-components";
import styled from "styled-components/native";

export const CommonConatinerInner = styled.View`
  flex: 1;
`;

export const CommonContainer = styled.View`
  position: relative;
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

export const flexRowAlignCenter = css`
  align-items: center;
  flex-direction: row;
`;

export const StyledKeyboardAcc = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export const StyledFloatingSubmitButton = styled(Buttons)<{
  isDisabled: boolean;
  margin?: boolean;
}>`
  margin: ${(props) =>
    props.margin
      ? `20px ${widthPercentage(16)}px`
      : `20px ${widthPercentage(16)}px 0`};
  height: ${widthPercentage(42)}px;
  background-color: ${(props) =>
    props.isDisabled ? props.theme.floatingBtnColor : props.theme.mainColor};
  border-radius: ${widthPercentage(12)}px;
  justify-content: center;
  align-items: center;
`;

export const StyledFloatingText = styled.Text`
  color: #fff;
  font-size: ${fontPercentage(13.4)}px;
  font-weight: 500;
  /* font-family: "AppleSDGothicNeoM00"; */
`;
