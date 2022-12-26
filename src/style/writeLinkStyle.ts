import styled from "styled-components/native";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../hooks/useResponseSize";
import { Buttons, Inputs } from "../components/atom";
import { flexRowAlignCenter } from "./common";

export const StyledContainer = styled.View``;

export const StyledTitle = styled.Text<{ isBold: boolean; main?: boolean }>`
  padding-right: ${widthPercentage(22)}px;
  overflow: hidden;
  font-weight: ${(props) => (props.isBold ? 600 : 400)};
  height: ${widthPercentage(14)}px;
  color: ${(props) => props.theme.textDescColor};
  font-size: ${(props) =>
    props.main ? `${fontPercentage(12.8)}px` : `${fontPercentage(12)}px`};
`;

export const StyledActionButtonText = styled.Text`
  color: #fff;
  font-size: ${fontPercentage(9)}px;
`;

export const StyledLinkView = styled.View`
  max-width: 100%;
  border-radius: ${widthPercentage(12)}px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${heightPercentage(17)}px ${widthPercentage(18)}px
    ${heightPercentage(16)}px;
  font-size: ${fontPercentage(9)}px;
  background-color: ${(props) => props.theme.mainBgColor};
  width: ${widthPercentage(288)}px;
  border: ${(props) => `1px solid ${props.theme.borderColor}`};
`;

export const StyledItemView = styled(StyledLinkView)`
  padding: ${heightPercentage(14)}px ${widthPercentage(18)}px
    ${heightPercentage(13)}px;
`;

export const StyledLinkTag = styled.View`
  /* width: auto; */
  margin-top: ${heightPercentage(6)}px;
  padding: ${heightPercentage(4)}px ${widthPercentage(8)}px;
  background-color: ${(props) => props.theme.tagBgColor};
  border-radius: ${widthPercentage(12)}px;
`;

export const StyledLinkTagDesc = styled.Text`
  color: ${(props) => props.theme.tagTextColor};
  font-size: ${fontPercentage(9)}px;
  font-weight: 500;
`;

export const StyledCatTitleInputContainer = styled.Pressable`
  ${flexRowAlignCenter}
  justify-content: space-between;
  height: ${widthPercentage(40)}px;
  border-radius: ${widthPercentage(12)}px;
  background-color: ${(props) => props.theme.inputBgColor};
  padding: ${heightPercentage(14)}px ${widthPercentage(18)}px
    ${heightPercentage(13)}px;
  font-size: ${fontPercentage(12)}px;
`;

export const StyleTitleLabels = styled.Text`
  font-size: ${fontPercentage(12)}px;
  margin-bottom: ${heightPercentage(9)}px;
  font-weight: 700;
  color: ${(props) => props.theme.textDescColor};
`;

export const StyledTextContainer = styled.View`
  margin: -${heightPercentage(2)}px 0 ${heightPercentage(9)}px;
  flex-direction: row;
  align-items: center;
`;

export const StyledCountText = styled.Text`
  color: ${(props) => props.theme.descColor};
  font-size: ${fontPercentage(9)}px;
  font-weight: 700;
`;

export const StyledSubText = styled.Text`
  color: ${(props) => props.theme.descColor};
  font-size: ${fontPercentage(9)}px;
  font-weight: 500;
`;

export const StyledLinkInput = styled(Inputs)`
  font-size: ${fontPercentage(12)}px;
  height: ${widthPercentage(42)}px;
`;

export const StyledListContainer = styled(Buttons)<{ isActive: boolean }>`
  ${flexRowAlignCenter}
  justify-content: space-between;

  border-radius: ${fontPercentage(12)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive ? props.theme.mainColor : props.theme.borderColor};
  margin-top: ${heightPercentage(9)}px;
  height: ${heightPercentage(42)}px;
  padding: 0 ${widthPercentage(18)}px;
`;
