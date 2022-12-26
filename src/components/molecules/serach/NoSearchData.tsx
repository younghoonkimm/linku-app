import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "hooks/useResponseSize";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";

const StyledNodataContainer = styled.View`
  padding: 0 ${widthPercentage(20)}px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledText = styled.Text`
  margin-top: ${heightPercentage(3)}px;
  font-size: ${fontPercentage(12)}px;
  color: ${(props) => props.theme.descColor};
  font-weight: 600;
`;

const StyledBoldText = styled(StyledText)`
  color: ${(props) => props.theme.noLinkBoldColor};
`;

function NoSearchData({ searchData }: { searchData: string }) {
  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <StyledNodataContainer>
        <StyledBoldText numberOfLines={1}>
          '
          {searchData.length > 30
            ? searchData.slice(0, 30) + "..."
            : searchData}
          '
        </StyledBoldText>
        <StyledText>검색 결과가 없습니다.</StyledText>
      </StyledNodataContainer>
    </KeyboardAvoidingView>
  );
}

export default NoSearchData;
