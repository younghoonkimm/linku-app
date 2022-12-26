import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import uuid from "react-native-uuid";
import { Inputs, Buttons, Modals } from "../../../components/atom";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { ChevronIcon, CloseBtn, SearchIcons } from "../../../components/svg";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, Pressable, TextInput, View } from "react-native";
import useDarkMode from "../../../hooks/useDarkMode";

import Animated, {
  Keyframe,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useDb } from "../../../../context";
import useSearchData from "../../../hooks/useSearchData";
import { SearchSchemaType } from "../../../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { flexRowAlignCenter } from "../../../style/common";
import { HomeLinkDeleteModal, SearchDataItem } from "../../molecules";
import { replaceSpace } from "../../../utils/isSpacen";

const Conatiner = styled.View`
  flex-direction: row;
  margin: ${heightPercentage(18)}px ${widthPercentage(16)}px 0;
  align-items: center;
  justify-content: space-between;
`;

const StyledInputContainer = styled.Pressable`
  flex-direction: row;
  border-radius: ${widthPercentage(12)}px;
  padding: ${heightPercentage(10)}px ${widthPercentage(15)}px
    ${heightPercentage(10)}px ${widthPercentage(18)}px;
  height: ${widthPercentage(40)}px;
  background-color: ${(props) => props.theme.inputBgColor};
  flex: 1;

  /* width: 100%; */
`;

const StyledInput = styled(Inputs)`
  margin-right: ${widthPercentage(10)}px;
  max-width: 87%;
  font-size: ${fontPercentage(12)}px;
`;

const StyledButton = styled(Buttons)`
  position: absolute;
  right: ${widthPercentage(16)}px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const BackButtonWrapper = styled.View`
  margin-left: -${widthPercentage(10)}px;
`;

const StyledBackButton = styled.Pressable`
  margin-right: ${widthPercentage(6)}px;
  /* width: ${widthPercentage(14)}px; */
  height: ${widthPercentage(40)}px;
  justify-content: center;
  align-items: center;
`;

const StyledSearchArea = styled.View<{ height: number }>`
  position: absolute;
  top: ${widthPercentage(40) + heightPercentage(21)}px;
  left: 0;
  right: 0;
  z-index: 88;
  background: ${(props) => props.theme.mainBgColor};
  height: 100%;
  flex: 1;
`;

const BottomView = styled.View`
  width: 100%;
  height: 100px;
  background: ${(props) => props.theme.mainBgColor};
`;

const StyledFlatList = styled.FlatList`
  padding: 0 ${widthPercentage(16)}px;
`;

const StyledRecently = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: ${fontPercentage(10)}px;
`;

const StyledView = styled.View`
  padding-top: ${heightPercentage(22)}px;
  padding-bottom: 10px;
  justify-content: space-between;
  ${flexRowAlignCenter}
  background-color: ${(props) => props.theme.mainBgColor};
  padding-left: ${widthPercentage(16)}px;
  padding-right: ${widthPercentage(16)}px;
`;

const StyledDeleteButtonText = styled.Text<{ isEmpty: boolean }>`
  color: ${(props) =>
    props.isEmpty ? props.theme.dimmedDeleteBtn : props.theme.sortDeleteColor};
  font-size: ${fontPercentage(10)}px;
  font-weight: 500;
`;

interface HomeInputContainerProps {
  text: string;
  setText: (value: string) => void;
  setFocusRender?: boolean;
  isSeachPage?: boolean;
  onSearch?: boolean;
}

function HomeInputContainer({
  text,
  setText,
  setFocusRender = false,
  isSeachPage = false,
  onSearch = false,
}: HomeInputContainerProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any, "Home">>();
  const { isDarkMode } = useDarkMode();
  const realm = useDb();

  const [searchData] = useSearchData();

  const inputBlur = () => inputRef.current?.blur();
  const inputFocus = () => inputRef.current?.focus();

  const navigateSearchPage = (text: string) => {
    setIsFocused(false);
    inputBlur();
    navigation.navigate("SearchPage", {
      screen: "SearchPage",
      params: { searchData: text },
    });
  };

  const handleClickSearchText = async (data: typeof SearchSchemaType) => {
    await realm.write(() => {
      //@ts-ignore
      data.date = Date.now();
    });
    navigateSearchPage(data.searchText);
  };
  const onCloseDeleteModal = () => setOpenSearch(false);

  const onOpenDeleteModal = () => {
    if (searchData.length === 0) return;
    setOpenSearch(true);
  };

  const deletAllSearchData = async () => {
    await realm.write(() => {
      realm.delete(searchData);
    });
    onCloseDeleteModal();
  };
  const handleNavigateSearchPage = async (text: string) => {
    if (replaceSpace(text) === "") return;
    const isSearchData = searchData.find((value) => value.searchText === text);

    if (isSearchData) {
      await realm.write(() => {
        //@ts-ignore
        isSearchData.date = Date.now();
      });

      return navigateSearchPage(text);
    }

    if (searchData.length > 40) {
      await realm.write(() => {
        realm.delete(searchData[searchData.length - 1]);
      });
    }
    await realm.write(() => {
      realm.create("Search", {
        _id: uuid.v4(),
        searchText: text,
        date: Date.now(),
      });
    });
    navigateSearchPage(text);
  };

  const onSubmit = () => {
    handleNavigateSearchPage(text);

    inputBlur();
  };

  const handleGoHome = () => navigation.goBack();

  const handleBackButton = () => {
    // setIsFocused(f\);
    setText("");
    setIsFocused(false);
    if (onSearch) return inputBlur();
    handleGoHome();
  };

  const deleteSearchData = (data: any) => {
    realm.write(() => {
      realm.delete(data);
    });
  };

  const newAnim = new Keyframe({
    0: {
      width: 0,
    },

    100: {
      width: widthPercentage(14),
    },
  });

  const animationIcon = useSharedValue({
    width: widthPercentage(14),
    height: widthPercentage(40),
  });

  const animationIconStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animationIcon.value.width, {
        duration: 500,
      }),
    };
  });

  useEffect(() => {
    if (isFocused || isSeachPage) {
      animationIcon.value = {
        width: widthPercentage(14),
        height: widthPercentage(40),
      };
    } else {
      animationIcon.value = {
        width: widthPercentage(0),
        height: widthPercentage(40),
      };
    }
  }, [isFocused, isSeachPage]);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setIsScrolled(false);
  }, [isFocused]);

  const handleScrolled = (e: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    Keyboard.dismiss();

    // if (contentSize.height > layoutMeasurement.height) {
    if (contentOffset.y <= 0) {
      setIsScrolled(false);
    }
    if (contentOffset.y > 0) {
      setIsScrolled(true);
    }
    // }
  };

  return (
    <>
      <Modals isOpen={openSearch} setIsOpen={setOpenSearch}>
        <HomeLinkDeleteModal
          onClose={onCloseDeleteModal}
          onDeleteLinks={deletAllSearchData}
          deleteArrayLength={searchData?.length}
          isSearchText
        />
      </Modals>
      <Conatiner>
        {isFocused || isSeachPage ? (
          // <StyledBackButton style={animationIconStyle}>
          <StyledBackButton onPress={handleBackButton}>
            <BackButtonWrapper>
              <ChevronIcon
                width={widthPercentage(24)}
                height={widthPercentage(24)}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </BackButtonWrapper>
          </StyledBackButton>
        ) : null}

        <StyledInputContainer onPress={inputFocus}>
          <StyledInput
            name="search"
            ref={inputRef}
            text={text}
            setText={setText}
            onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            placeholder="링크 제목을 검색해 보세요"
            onSubmit={onSubmit}
            enablesReturnKeyAutomatically={true}
          />

          {isFocused ? (
            <StyledButton onPress={() => setText("")}>
              <CloseBtn
                width={widthPercentage(20)}
                height={heightPercentage(20)}
                color={isDarkMode ? "#3E3E3E" : "#c2c2c2"}
              />
            </StyledButton>
          ) : !isSeachPage ? (
            <StyledButton onPress={onSubmit}>
              <SearchIcons
                width={widthPercentage(20)}
                height={heightPercentage(20)}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </StyledButton>
          ) : null}
        </StyledInputContainer>
      </Conatiner>
      {isFocused ? (
        // <TouchableWithoutFeedback ></TouchableWithoutFeedback>
        <StyledSearchArea style={{ overflow: "hidden" }}>
          <StyledView
            style={{
              shadowColor: isScrolled ? "#000" : "transparent",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 42,
            }}
          >
            <StyledRecently>최근 검색어</StyledRecently>
            <Pressable onPress={onOpenDeleteModal}>
              <StyledDeleteButtonText isEmpty={searchData?.length === 0}>
                전체삭제
              </StyledDeleteButtonText>
            </Pressable>
          </StyledView>

          <StyledFlatList
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<View style={{ width: "100%", height: 15 }} />}
            data={searchData}
            onScroll={handleScrolled}
            keyboardShouldPersistTaps={"handled"}
            extraData={searchData}
            renderItem={({ item, index }) => (
              <SearchDataItem
                index={index}
                onPress={() => handleClickSearchText(item)}
                data={item}
                key={item._id}
                deleteSearchData={deleteSearchData}
              />
            )}
          />

          <BottomView />

          {/* <FlatList data={searchData} renderItem={({item}=><View></View>}/> */}
        </StyledSearchArea>
      ) : null}
    </>
  );
}

export default HomeInputContainer;
