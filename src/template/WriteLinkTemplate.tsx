import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useDb } from "../../context";
import { heightPercentage, widthPercentage } from "../hooks/useResponseSize";
import { WriteLinkCategorySelect } from "../components/oraganism";
import {
  FloatingSubmitButton,
  WriteLinkInput,
  KeyboardAccButton,
  WriteTitleInput,
} from "../components/molecules";
import { ShadowBox } from "./WriteCategoryTemplate";
import useScrolled from "../hooks/useScrolled";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { replaceSpace } from "../utils/isSpacen";
import { Keyboard } from "react-native";

const StyledCont = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
  overflow: hidden;
`;

const Container = styled(KeyboardAwareScrollView)`
  padding: 0 ${widthPercentage(16)}px;
  flex-grow: 1;
`;

const ConatinerInner = styled.View`
  flex: 1;
  /* padding-bottom: ${widthPercentage(42)}px; */
  background-color: ${(props) => props.theme.mainBgColor};
`;

function WriteLinkTemplate({ params }: any) {
  const navigation = useNavigation();

  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [newCat, setNewCat] = useState<string>("");
  const [selectCat, setSelectCat] = useState<string>("");
  const { isScrolled, handleScrolled } = useScrolled();

  const realm = useDb();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (params) {
      const { title, link, categoryName } = params.params;

      setTitle(title);
      setLink(link);
      setSelectCat(categoryName);
    }
  }, [params]);

  const hasCorrectValues =
    !link || !title || replaceSpace(link) === "" || replaceSpace(title) === "";

  const onSubmit = async () => {
    if (hasCorrectValues) {
      return;
    }
    try {
      if (params) {
        const realmLinks = realm
          .objects("Links")
          .filtered(`_id = "${params.params._id}"`)[0];

        await realm.write(() => {
          realmLinks.link = link;
          realmLinks.title = title;
          realmLinks.categoryName = selectCat;
        });
      } else {
        await realm.write(() => {
          realm.create("Links", {
            _id: uuid.v4(),
            link,
            title,
            categoryName: selectCat,
            date: Date.now(),
          });
        });
      }

      navigation.navigate("Home", null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StyledCont>
        <ShadowBox
          isDisplay={isScrolled}
          style={{
            shadowColor: isScrolled ? "#000" : "transparent",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.06,
            shadowRadius: 2,
            elevation: 4,
          }}
        />
        <Container
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isKeyboardVisible ? 0 : widthPercentage(80),
          }}
          onScroll={handleScrolled}
          onMomentumScrollEnd={handleScrolled}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="always"
          // keyboardDismissMode={true}
        >
          <ConatinerInner>
            <WriteLinkInput link={link} setLink={setLink} />
            <WriteTitleInput title={title} setTitle={setTitle} />
            <WriteLinkCategorySelect
              newCat={newCat}
              setNewCat={setNewCat}
              selectCat={selectCat}
              setSelectCat={setSelectCat}
            />
          </ConatinerInner>
        </Container>
        <FloatingSubmitButton
          onPress={onSubmit}
          text={"등록하기"}
          isDisabled={hasCorrectValues}
        />
        <KeyboardAccButton
          onSubmit={onSubmit}
          text="등록하기"
          isDisabled={hasCorrectValues}
        />
      </StyledCont>
    </>
  );
}

export default WriteLinkTemplate;
