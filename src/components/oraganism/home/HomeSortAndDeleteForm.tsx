import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import { Buttons } from "../../../components/atom";
import {
  heightPercentage,
  widthPercentage,
  fontPercentage,
} from "hooks/useResponseSize";
import { SortingIcons } from "../../../components/svg";
import { sortOptionLists } from "helper/home";
import { flexRowAlignCenter } from "../../../style/common";
import useDarkMode from "../../../hooks/useDarkMode";
import { View } from "react-native";

const StyledForm = styled.View<{ isScrolled: boolean; isEditMode: boolean }>`
  ${flexRowAlignCenter}
  justify-content: ${(props) =>
    props.isEditMode ? "flex-end" : "space-between"};
  padding: ${heightPercentage(12)}px ${widthPercentage(16)}px
    ${heightPercentage(9)}px ${widthPercentage(16)}px;
  height: ${heightPercentage(32.5)}px;
  background-color: ${(props) => props.theme.mainBgColor};
  /* box-shadow: ${(props) =>
    props.isScrolled
      ? "0px 3px 3px rgba(0, 0, 0, 0.12)"
      : "0px 2px 4px transparent"}; */

  z-index: 2;
`;

const StyledSortButtonContainer = styled(Buttons)`
  ${flexRowAlignCenter}
  color: ${(props) => props.theme.textDescColor};
`;

const StyledSortButtonText = styled.Text<{ isEmpty: boolean }>`
  font-size: ${fontPercentage(10)}px;
  font-weight: 600;
  color: ${(props) =>
    props.isEmpty ? props.theme.dimmedDeleteBtn : props.theme.textDescColor};
`;

export const StyledDeleteButtonText = styled.Text<{ isEmpty: boolean }>`
  color: ${(props) =>
    props.isEmpty ? props.theme.dimmedDeleteBtn : props.theme.sortDeleteColor};
  font-size: ${fontPercentage(10)}px;
  font-weight: 500;
  align-self: flex-end;
`;

export const MarginRightButton = styled(Buttons)`
  margin-right: ${widthPercentage(18)}px;
`;

interface HomeSortAndDeleteFormProps {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setIsSort: Dispatch<SetStateAction<boolean>>;
  isScrolled: boolean;
  sortOption: number;
  isDeleteArray: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  selectAllDeleteArray: () => void;
  resetDeleteArray: () => void;
  isEmpty: boolean;
}

function HomeSortAndDeleteForm({
  isEditMode,
  setIsEditMode,
  setIsSort,
  isScrolled,
  sortOption,
  isDeleteArray,
  selectAllDeleteArray,
  setEditMode,
  resetDeleteArray,
  isEmpty,
}: HomeSortAndDeleteFormProps) {
  const openSortDataPopUp = () => {
    if (isEmpty) return;
    setIsSort(true);
  };

  const { isDarkMode } = useDarkMode();

  return (
    <View style={{ overflow: "hidden", zIndex: 2, paddingBottom: 4 }}>
      <StyledForm
        style={{
          shadowColor: isScrolled ? "#000" : "transparent",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 4,
        }}
        isEditMode={isEditMode}
      >
        {!isEditMode ? (
          <>
            <StyledSortButtonContainer onPress={openSortDataPopUp}>
              <StyledSortButtonText isEmpty={isEmpty}>
                {sortOptionLists[sortOption].text}
              </StyledSortButtonText>
              <SortingIcons
                width={widthPercentage(15)}
                height={heightPercentage(15)}
                color={
                  isDarkMode
                    ? isEmpty
                      ? "#3e3e3e"
                      : "#fff"
                    : isEmpty
                    ? "#e0e0e0"
                    : "#000"
                }
              />
            </StyledSortButtonContainer>
            <Buttons onPress={setIsEditMode}>
              <StyledDeleteButtonText isEmpty={isEmpty}>
                삭제
              </StyledDeleteButtonText>
            </Buttons>
          </>
        ) : null}
        {isEditMode ? (
          <>
            {isDeleteArray ? (
              <Buttons onPress={resetDeleteArray}>
                <StyledDeleteButtonText>취소</StyledDeleteButtonText>
              </Buttons>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MarginRightButton
                  onPress={selectAllDeleteArray}
                  style={{ alignItem: "flex-end" }}
                >
                  <StyledDeleteButtonText>전체선택</StyledDeleteButtonText>
                </MarginRightButton>
                <Buttons onPress={() => setEditMode(false)}>
                  <StyledDeleteButtonText>취소</StyledDeleteButtonText>
                </Buttons>
              </View>
            )}
          </>
        ) : null}
      </StyledForm>
    </View>
  );
}

export default HomeSortAndDeleteForm;
