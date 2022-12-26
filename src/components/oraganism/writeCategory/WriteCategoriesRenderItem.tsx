import React, { useEffect, useRef, useState } from "react";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import styled from "styled-components/native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

import {
  heightPercentage,
  widthPercentage,
  fontPercentage,
} from "../../../hooks/useResponseSize";
import { useTheme } from "../../../../context";
import { DragHandle } from "../../svg";
import { CategoriesType } from "../../../../App";
import { Keyboard, Pressable, TextInput } from "react-native";

const StyledView = styled.View<{ isActive: boolean }>`
  position: relative;
  max-width: 100%;
  border-radius: ${widthPercentage(12)}px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* padding: ${heightPercentage(14)}px ${widthPercentage(45)}px
    ${heightPercentage(13)}px ${widthPercentage(18)}px; */
  font-size: ${fontPercentage(9)}px;
  /* background-color: ${(props) => props.theme.catRenderItemColor}; */
  width: ${widthPercentage(288)}px;
  background-color: ${(props) => props.theme.mainBgColor};
  border: ${(props) =>
    props.isActive
      ? `1px solid ${props.theme.mainColor}`
      : `1px solid ${props.theme.catRenderItemBorderColor}`};
`;

const StyledDragHanlder = styled.Pressable`
  position: absolute;
  width: ${widthPercentage(40)}px;
  /* height: ${widthPercentage(40)}px; */

  right: ${widthPercentage(0)}px;
  align-self: center;
  height: ${heightPercentage(30)}px;
  top: 50%;
  transform: ${`translateY(-${heightPercentage(15)}px)`};

  align-items: center;
  justify-content: center;
`;

const StyledCatText = styled.Text`
  font-size: ${fontPercentage(12)}px;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledTextInput = styled.TextInput<{ fullWidth: boolean }>`
  font-size: ${fontPercentage(12)}px;
  width: ${(props) => (props.fullWidth ? "auto" : "100%")};
  color: ${(props) => props.theme.textDescColor};
  padding: ${(props) =>
    props.fullWidth
      ? `${heightPercentage(14)}px ${widthPercentage(4)}px
    ${heightPercentage(13)}px ${widthPercentage(18)}px;`
      : `${heightPercentage(14)}px ${widthPercentage(45)}px
    ${heightPercentage(13)}px ${widthPercentage(18)}px;`};
`;

const StyledCountText = styled.Text`
  margin-left: ${widthPercentage(3)}px;
  color: ${(props) => props.theme.mainColor};
  font-weight: 600;
  font-size: ${fontPercentage(12)}px;
`;

interface WriteCategoriesRenderItemProps {
  item: typeof CategoriesType;
  handleDragList: (drag: any) => void;
  countLink: (item: typeof CategoriesType) => void;
  drag: any;
  onFocusEditRef: (_id: string) => void;
  editInputId: string;
  onChangeText: (value: string, _id: string) => void;
  [key: string]: any;
}

const WriteCategoriesRenderItem = React.forwardRef(
  (
    {
      item,
      handleDragList,
      countLink,
      drag,
      onFocusEditRef,
      editInputId,
      onChangeText,
      ...rest
    }: WriteCategoriesRenderItemProps,
    ref?: any
  ) => {
    const { _id, categoryName, order } = item;
    const inputRef = useRef<TextInput | null>(null);

    const { darkMode } = useTheme();

    useEffect(() => {
      if (editInputId === _id) {
        inputRef?.current?.focus();
      }

      if (editInputId !== _id) {
        inputRef?.current?.blur();
      }
    }, [editInputId]);

    return (
      <ScaleDecorator>
        <Swipeable
          containerStyle={{
            paddingHorizontal: widthPercentage(16),
            marginBottom: heightPercentage(9),
          }}
          overshootRight={false}
          overshootLeft={false}
          friction={2}
          rightThreshold={0}
          ref={ref}
          {...rest}
        >
          <Pressable
            onPress={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
              onFocusEditRef(_id);
            }}
          >
            <StyledView isActive={editInputId === _id}>
              <StyledTextInput
                fullWidth={editInputId !== _id}
                ref={inputRef}
                selectionColor={darkMode ? "#6464FF" : "rgba(131, 120, 239, 1)"}
                value={categoryName}
                maxLength={10}
                onFocus={() => onFocusEditRef(_id)}
                onChangeText={(value: string) => onChangeText(value, _id)}
              />
              {editInputId !== _id && (
                <StyledCountText>{countLink(item)}</StyledCountText>
              )}
            </StyledView>
          </Pressable>
          {editInputId === _id ? null : (
            <StyledDragHanlder
              onLongPress={() => {
                Keyboard.dismiss();
                handleDragList(drag);
                editInputId = "";
              }}
            >
              <DragHandle
                width={widthPercentage(10)}
                height={heightPercentage(8)}
              />
            </StyledDragHanlder>
          )}
        </Swipeable>
      </ScaleDecorator>
    );
  }
);

export default WriteCategoriesRenderItem;
