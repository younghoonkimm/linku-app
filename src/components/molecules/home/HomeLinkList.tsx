import React from "react";

import { LinkType } from "../../../../App";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { NoLinkDataMainPage } from "../../svg";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import useDarkMode from "../../../hooks/useDarkMode";

export interface HomeLinkRenderItem {
  item: typeof LinkType;
  index?: number;
  [key: string]: any;
}

export interface HomeListProps {
  data: any;
  renderItem: any;
  [key: string]: any;
}

const StyledContainer = styled.View`
  flex: 1;
`;
const StyledHomeLinkList = styled(FlatList)`
  flex: 1;
`;

const NoLinkDataContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NoLinkText = styled.Text`
  margin-top: ${heightPercentage(20)}px;
  font-size: ${fontPercentage(12)}px;
  align-self: center;
  font-weight: 400;
  color: ${(props) => props.theme.noLinkText};
`;

const HomeLinkList = React.forwardRef(
  ({ data, renderItem, ...rest }: HomeListProps, ref: any) => {
    const { isDarkMode } = useDarkMode();

    const NoLinkData = () => (
      <NoLinkDataContainer>
        <NoLinkDataMainPage
          width={widthPercentage(52)}
          height={heightPercentage(72)}
          darkMode={isDarkMode}
        />
        <NoLinkText>
          저장된 링크가 없어요.{"\n"} 링크를 추가해보세요.
        </NoLinkText>
      </NoLinkDataContainer>
    );

    return (
      <StyledContainer>
        <StyledHomeLinkList
          ref={ref}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 100,
            flex: data.length > 0 ? 0 : 1,
          }}
          ListEmptyComponent={<NoLinkData />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.8}
          {...rest}
        />
      </StyledContainer>
    );
  }
);

export default HomeLinkList;
