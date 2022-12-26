import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from "../../../hooks/useResponseSize";
import { Buttons } from "../../../components/atom";
import { flexRowAlignCenter } from "../../../style/common";

const StyledHomeSortModalContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  height: ${heightPercentage(155)}px;
  border-top-left-radius: ${widthPercentage(18)}px;
  border-top-right-radius: ${widthPercentage(18)}px;
  padding: ${heightPercentage(30)}px ${widthPercentage(16)}px
    ${heightPercentage(12)}px;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const StyledTitle = styled.Text`
  font-weight: 700;
  font-size: ${fontPercentage(15)}px;
  margin-bottom: ${heightPercentage(12)}px;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledDesc = styled.Text`
  margin-bottom: ${heightPercentage(22)}px;
  font-size: ${fontPercentage(12)}px;
  color: ${(props) => props.theme.descColor};
  font-weight: 500;
`;

const StyledBold = styled.Text`
  font-size: ${fontPercentage(12)}px;
  font-weight: 600;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledButtonContainer = styled.View`
  flex-direction: row;
`;

const StyledButtons = styled(Buttons)<{ marginRight: boolean; redBg: boolean }>`
  ${flexRowAlignCenter}
  justify-content: center;
  width: ${widthPercentage(139)}px;
  height: ${widthPercentage(45)}px;
  border-radius: ${widthPercentage(12)}px;
  background-color: ${(props) =>
    props.redBg ? props.theme.redColor : "rgba(145, 145, 145, 1)"};
  margin-right: ${(props) =>
    props.marginRight ? `${widthPercentage(10)}px` : "0"};
`;

const StyledButtonText = styled.Text`
  color: #fff;
  font-size: ${fontPercentage(12)}px;
  font-weight: 500;
`;

interface HomeLinkDeleteModalProps {
  onClose: () => void;
  onDeleteLinks: () => void;
  deleteArrayLength: number;
  isSearchText?: boolean;
}

function HomeLinkDeleteModal({
  onClose,
  onDeleteLinks,
  deleteArrayLength,
  isSearchText,
}: HomeLinkDeleteModalProps) {
  return (
    <StyledHomeSortModalContainer>
      <StyledTitle>{isSearchText ? "검색어 삭제" : "링크 삭제"}</StyledTitle>
      <StyledDesc>
        선택한 <StyledBold>{deleteArrayLength}개</StyledBold>의 링크를
        삭제하시겠습니까?
      </StyledDesc>
      <StyledButtonContainer>
        <StyledButtons onPress={onClose} marginRight>
          <StyledButtonText>취소하기</StyledButtonText>
        </StyledButtons>
        <StyledButtons onPress={onDeleteLinks} redBg>
          <StyledButtonText>삭제하기</StyledButtonText>
        </StyledButtons>
      </StyledButtonContainer>
    </StyledHomeSortModalContainer>
  );
}

export default HomeLinkDeleteModal;
