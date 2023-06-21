import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useRealmSearchData from "../hooks/useRealmSearchData";
import { HomeInputContainer } from "../components/oraganism";
import { CommonContainer, flexRowAlignCenter } from "../style/common";
import {
  StyledLinkTag,
  StyledLinkTagDesc,
  StyledItemView,
  StyledTitle,
} from "../style/writeLinkStyle";
import { FlatLists } from "../components/atom";
import useRealmData from "../hooks/useRealmData";
import { findCategoryName, openURLLink } from "../utils/openLink";
import { LinkType } from "../../App";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../hooks/useResponseSize";

import { NoSearchData } from "../components/molecules";
import { ActivityIndicator, Text, View } from "react-native";

const Container = styled(CommonContainer)`
  flex: 1;
  padding-bottom: 30px;
`;

const StyledSearchInput = styled(HomeInputContainer)`
  width: ${widthPercentage(100)}px;
`;

const StyledSearchLinkList = styled(FlatLists)`
  margin-top: ${heightPercentage(9)}px;
  overflow: hidden;
  flex: 1;
`;

const StyledLinkButton = styled.Pressable`
  margin-bottom: ${heightPercentage(9)}px;
`;

const StyledSearchCountDesc = styled.Text`
  color: ${(props) => props.theme.searchTextColor};
  font-size: ${fontPercentage(10)}px;
  font-weight: 500;
`;

const StyledSearchCount = styled.Text`
  margin-left: 2px;
  color: ${(props) => props.theme.mainColor};
  font-size: ${fontPercentage(10)}px;
  font-weight: 700;
`;

const StyledSearchCountContainer = styled.View<{ isScrolled: boolean }>`
  margin-top: ${heightPercentage(27)}px;
  ${flexRowAlignCenter}
  padding: 0 ${widthPercentage(16)}px;

  /* box-shadow: ${(props) =>
    props.isScrolled
      ? "0px 3px 3px rgba(0, 0, 0, 0.12)"
      : "0px 2px 4px transparent"}; */
`;

const StyledHighlight = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

function SearchTemplate({ navigate, params: { params } }: any) {
  const { searchData } = params;
  const [searchText, setSearchText] = useState<string>(searchData);
  const handleSearchText = (value: string) => setSearchText(value);
  const [searchLinks, searchLoading, setSearchLoading] =
    useRealmSearchData(searchData);

  useEffect(() => {
    setSearchText(searchData);
  }, [params]);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScrolled = (e: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;

    if (contentSize.height > layoutMeasurement.height) {
      if (contentOffset.y <= 0) {
        setIsScrolled(false);
      }
      if (!searchLoading) {
        if (contentOffset.y > 0) {
          setIsScrolled(true);
        }
      }
    }
  };

  const [categories] = useRealmData();

  const onRefresh = () => {
    setSearchLoading(true);
  };

  return (
    <Container>
      <StyledSearchInput
        text={searchText}
        setText={handleSearchText}
        isSeachPage
      />
      {searchData ? (
        <>
          {searchLinks?.length > 0 ? (
            <StyledSearchCountContainer>
              <StyledSearchCountDesc>검색결과</StyledSearchCountDesc>
              <StyledSearchCount>{searchLinks.length}</StyledSearchCount>
            </StyledSearchCountContainer>
          ) : null}
          {searchLinks !== null ? (
            <StyledSearchLinkList
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                overflow: "hidden",
              }}
              onScroll={handleScrolled}
              refreshing={searchLoading}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<NoSearchData searchData={searchData} />}
              data={searchLinks}
              onEndReachedThreshold={0.8}
              keyExtractor={(link: typeof LinkType) => link._id + ""}
              renderItem={({ item }: { item: typeof LinkType }) => (
                <StyledLinkButton
                  onPress={() => openURLLink(item.link)}
                  key={item._id}
                >
                  <StyledItemView>
                    <StyledTitle numberOfLines={1}>
                      {item.title?.split(searchData).map((text, i) =>(
                          <React.Fragment key={text + item._id + i}>
                            {i > 0 ? </StyledSearchLinkList><StyledHighlight>{searchData}</StyledHighlight> : null}
                            {text}
                          </React.Fragment>
                       )
                      )}
                    </StyledTitle>
                    {findCategoryName(item, categories) ? (
                      <StyledLinkTag>
                        <StyledLinkTagDesc numberOfLines={1}>
                          {findCategoryName(item, categories)}
                        </StyledLinkTagDesc>
                      </StyledLinkTag>
                    ) : null}
                  </StyledItemView>
                </StyledLinkButton>
              )}
            />
          ) : (
            <ActivityIndicator />
          )}
        </>
      ) : null}
    </Container>
  );
}

export default SearchTemplate;
