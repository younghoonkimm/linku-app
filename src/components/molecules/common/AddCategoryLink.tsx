import React, { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components/native";
import uuid from "react-native-uuid";

import {
  StyledLinkInput,
  StyledCatTitleInputContainer,
} from "../../../style/writeLinkStyle";

import { flexRowAlignCenter } from "../../../style/common";
import { Buttons } from "../../atom";
import { CloseBtn } from "../../svg";
import { useDb } from "../../../../context";
import useRealmData from "../../../hooks/useRealmData";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { Keyboard, TextInput } from "react-native";
import useDarkMode from "../../../hooks/useDarkMode";
import { replaceSpace } from "../../../utils/isSpacen";

const StyledWidthInput = styled(StyledLinkInput)`
  width: ${widthPercentage(197)}px;
  font-size: ${fontPercentage(12)}px;
`;

const StyledButtonContainer = styled.View`
  margin-left: ${widthPercentage(10)}px;
  ${flexRowAlignCenter};
`;

const StyledCloseBtn = styled(Buttons)`
  height: 100%;
`;

const StyledDeleteBtnText = styled.Text`
  margin: -1px 0 0 ${widthPercentage(9)}px;
  color: ${(props) => props.theme.mainColor};
  font-size: ${fontPercentage(12)}px;
  /* font-weight: 600; */
  height: ${heightPercentage(10)}px;
  font-weight: 600;
`;

interface AddCategoryLinkProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setEditInputId?: () => void;
}

function AddCategoryLink({
  text,
  setText,
  setEditInputId,
}: AddCategoryLinkProps) {
  const [categories] = useRealmData();

  const inputRef = useRef<TextInput | null>(null);
  const { isDarkMode } = useDarkMode();
  const inputFocus = () => {
    inputRef.current?.focus();
    if (setEditInputId) {
      setEditInputId();
    }
  };

  const deleteText = () => setText("");

  const realm = useDb();

  const isNotLimit = categories?.length < 7;

  const isZeroCat = categories?.length <= 0;
  const getCatLength = 7 - categories?.length;

  const addCategory = async () => {
    if (replaceSpace(text) === "") return false;
    if (!isNotLimit) return;

    if (!text || text.length > 10) return;
    await realm.write(() => {
      realm.create("Categories", {
        _id: uuid.v4(),
        categoryName: text,
        order: categories.length,
      });
    });
    Keyboard.dismiss();
    setText("");
  };

  return (
    <StyledCatTitleInputContainer onPress={inputFocus}>
      <StyledWidthInput
        name="newcategory"
        ref={inputRef}
        setText={setText}
        value={text}
        numberOfLines={1}
        onSubmit={addCategory}
        maxLength={10}
        onFocus={() => {
          if (setEditInputId) {
            setEditInputId();
          }
        }}
        editable={isNotLimit}
        enablesReturnKeyAutomatically={true}
        placeholder={
          isZeroCat
            ? "추가할 카테고리를 입력해주세요"
            : isNotLimit
            ? `${getCatLength}개 더 추가할 수 있어요!`
            : "더 이상 추가할 수 없어요"
        }
      />
      {text ? (
        <StyledButtonContainer>
          <StyledCloseBtn onPress={deleteText}>
            <CloseBtn
              width={widthPercentage(18)}
              height={heightPercentage(18)}
              color={isDarkMode ? "#3E3E3E" : "#c2c2c2"}
            />
          </StyledCloseBtn>

          <StyledCloseBtn onPress={addCategory}>
            <StyledDeleteBtnText>추가</StyledDeleteBtnText>
          </StyledCloseBtn>
        </StyledButtonContainer>
      ) : null}
    </StyledCatTitleInputContainer>
  );
}

export default AddCategoryLink;
