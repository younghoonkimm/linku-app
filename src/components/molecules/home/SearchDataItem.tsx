import { CloseButtonIcon } from "../../../components/svg";
import React from "react";
import { Pressable, View, Text } from "react-native";
import styled from "styled-components/native";
import { flexRowAlignCenter } from "../../../style/common";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";

const StyledView = styled.View<{ index: number }>`
  justify-content: space-between;
  ${flexRowAlignCenter}
  margin-bottom: ${heightPercentage(9)}px;

  /* padding: ${(props) => (props.index === 0 ? "0 0 10px" : "0px")}; */
`;

const StyledText = styled.Text`
  color: ${(props) => props.theme.headerBackColor};
  font-size: ${fontPercentage(12)}px;
  font-weight: 400;
`;

const StyledCloseBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: ${widthPercentage(30)}px;
  height: ${widthPercentage(30)}px;
`;

function SearchDataItem({ data, onPress, deleteSearchData, index }: any) {
  return (
    <Pressable onPress={onPress}>
      <StyledView index={index}>
        <View style={{ width: "90%" }}>
          <StyledText numberOfLines={1}>{data?.searchText}</StyledText>
        </View>
        <StyledCloseBtn onPress={() => deleteSearchData(data)}>
          <CloseButtonIcon
            width={widthPercentage(16)}
            height={heightPercentage(16)}
          />
        </StyledCloseBtn>
      </StyledView>
    </Pressable>
  );
}

export default SearchDataItem;
