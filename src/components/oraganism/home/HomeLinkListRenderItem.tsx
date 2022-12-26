import React, { Dispatch, SetStateAction } from "react";

import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

import { HomeLinkRenderItem } from "../../molecules/home/HomeLinkList";
import { HomeLinkDeleteCheckBox } from "../../molecules";

import {
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { LinkType } from "../../../../App";

import { Pressable } from "react-native";
import {
  StyledLinkTag,
  StyledLinkTagDesc,
  StyledLinkView,
  StyledTitle,
} from "../../../style/writeLinkStyle";
import styled from "styled-components/native";

interface HomeLinkListRenderItemProps extends HomeLinkRenderItem {
  onPress: (url: string) => void;
  isEditMode: boolean;
  categoryName?: string | null;
  deleteArray: string[];
  setDeleteArray: Dispatch<SetStateAction<string[]>>;
}

export interface HomeLinkRenderItemParmaProps {
  item: typeof LinkType;
  index: number;
}

const StyledTitleBold = styled(StyledTitle)`
  font-weight: 700;
`;

const HomeLinkListRenderItem = React.forwardRef(
  (
    {
      item,
      onPress,
      isEditMode,
      deleteArray,
      categoryName,
      setDeleteArray,
      ...rest
    }: HomeLinkListRenderItemProps,
    ref: any
  ) => {
    const addDeleteArray = (id: string) =>
      setDeleteArray((prev) => [...prev, id]);
    const removeDeleteArray = (id: string) =>
      setDeleteArray((prev) =>
        prev.length > 0 ? prev.filter((value) => value !== id) : prev
      );

    const handleCheckBox = (checked: boolean) => {
      if (checked) {
        addDeleteArray(item._id);
      } else {
        removeDeleteArray(item._id);
      }
    };

    const isChecked = deleteArray.find((deleteItem) => deleteItem === item._id);

    return (
      // <GestureHandlerRootView>
      <Swipeable
        ref={ref}
        overshootRight={false}
        overshootLeft={false}
        rightThreshold={0}
        friction={2}
        containerStyle={{
          paddingHorizontal: widthPercentage(16),
          marginBottom: heightPercentage(9),
        }}
        {...rest}
      >
        {/* {item.title} */}
        <Pressable onPress={() => onPress(item.link)}>
          <StyledLinkView>
            <StyledTitle numberOfLines={2}>
              {item._id === "LinkuApp"
                ? item.title?.split("링쿠(LinkU)").map((text, i) =>
                    i > 0 ? (
                      <React.Fragment key={text + item._id + i}>
                        <StyledTitle main isBold>
                          {"링쿠(LinkU)"}
                        </StyledTitle>
                        {text}
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={text + item._id + i}>
                        <StyledTitle main>{text}</StyledTitle>
                      </React.Fragment>
                    )
                  )
                : item.title}
            </StyledTitle>
            {isEditMode ? (
              <HomeLinkDeleteCheckBox
                onPress={handleCheckBox}
                isChecked={isChecked}
              />
            ) : null}
            {categoryName ? (
              <StyledLinkTag>
                <StyledLinkTagDesc numberOfLines={1}>
                  {categoryName}
                </StyledLinkTagDesc>
              </StyledLinkTag>
            ) : null}
          </StyledLinkView>
        </Pressable>
      </Swipeable>
      // </GestureHandlerRootView>
    );
  }
);
export default HomeLinkListRenderItem;
