import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  widthPercentage,
  heightPercentage,
  fontPercentage,
} from "../../../hooks/useResponseSize";
import { Buttons } from "../../../components/atom";
import { flexRowAlignCenter } from "../../../style/common";
import { CategoriesType } from "../../../../App";
import { View } from "react-native";

const StyledHomeSortModalContainer = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  height: ${heightPercentage(189)}px;
  border-top-left-radius: ${widthPercentage(18)}px;
  border-top-right-radius: ${widthPercentage(18)}px;
  padding: ${heightPercentage(30)}px ${widthPercentage(16)}px
    ${heightPercentage(12)}px;
  background-color: #fff;
`;

const StyledTitle = styled.Text`
  font-size: ${fontPercentage(15)}px;
  /* margin-bottom: ${heightPercentage(12)}px; */
  text-decoration-line: underline;
  font-weight: 700;
  line-height: ${heightPercentage(21)}px;
  align-self: center;
`;

const StyledTitleDesc = styled(StyledTitle)`
  font-weight: 600;
  text-decoration-line: none;
`;

const StyledDescContainer = styled.View`
  margin-top: ${heightPercentage(10)}px;
  margin-bottom: ${heightPercentage(22)}px;
`;

const StyledDesc = styled.Text`
  font-size: ${fontPercentage(10)}px;
  color: ${(props) => props.theme.descColor};
  font-weight: 500;
  justify-content: center;
  text-align: center;
`;

const StyledBold = styled.Text`
  font-size: ${fontPercentage(10)}px;
  font-weight: 600;
  color: rgb(62, 62, 62);
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

interface DeleteCategoriesModalProps {
  deleteId: typeof CategoriesType | null;
  deleteCategory: (_id: typeof CategoriesType | null) => void;
  onClose: () => void;
}

function DeleteCategoriesModal({
  deleteId,
  deleteCategory,
  onClose,
}: DeleteCategoriesModalProps) {
  const [catName, setCatName] = useState("");

  useEffect(() => {
    if (deleteId) {
      setCatName(deleteId.categoryName);
    } else {
      setCatName("");
    }
  }, [deleteId]);

  return (
    <StyledHomeSortModalContainer>
      <View>
        <StyledTitle numberofLines={1}>{catName}</StyledTitle>
        <StyledTitleDesc>카테고리를 삭제하시겠어요?</StyledTitleDesc>
      </View>
      <StyledDescContainer>
        <StyledDesc>
          카테고리가 삭제되어도 링크들은{"\n"}
          <StyledBold>‘전체’</StyledBold> 카테고리에서 확인하실 수 있어요
        </StyledDesc>
      </StyledDescContainer>
      <StyledButtonContainer>
        <StyledButtons onPress={onClose} marginRight>
          <StyledButtonText>취소하기</StyledButtonText>
        </StyledButtons>
        <StyledButtons onPress={() => deleteCategory(deleteId)} redBg>
          <StyledButtonText>삭제하기</StyledButtonText>
        </StyledButtons>
      </StyledButtonContainer>
    </StyledHomeSortModalContainer>
  );
}

export default DeleteCategoriesModal;
