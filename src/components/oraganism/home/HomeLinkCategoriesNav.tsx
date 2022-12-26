import React from "react";
import { Keyboard, Text } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { HomeListProps } from "../../molecules/home/HomeLinkList";
import { Buttons, FlatLists } from "../../atom/";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";

const StyledHomeLinkCategoriesNav = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  margin-top: ${heightPercentage(21)}px;
  padding-bottom: ${heightPercentage(11)}px;
  padding-left: ${widthPercentage(16)}px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.homeNavBorderColor};
  border-style: solid;
  justify-content: center;
  flex-direction: row;
`;

const StyledEditButton = styled(Buttons)`
  margin-right: ${widthPercentage(6)}px;
  align-items: center;
  justify-content: center;
  padding: ${heightPercentage(6)}px ${widthPercentage(10)}px
    ${heightPercentage(6)}px;
  border-radius: ${widthPercentage(12)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.borderColor};
`;

const StyledEditButtonText = styled(Text)`
  color: rgba(194, 194, 194, 1);
  font-size: ${fontPercentage(9)}px;
`;

interface HomeLinkCategoriesNavProps extends HomeListProps {
  resetAction?: () => void;
  closeSwipe: () => void;
}

function HomeLinkCategoriesNav({
  data,
  renderItem,
  resetAction,
  closeSwipe,
  ...rest
}: HomeLinkCategoriesNavProps) {
  const navigation = useNavigation();

  const routeEditPage = () => {
    // resetAction();
    closeSwipe();
    Keyboard.dismiss();
    navigation.navigate("SettingCategory");
  };

  return (
    <StyledHomeLinkCategoriesNav>
      <StyledEditButton onPress={routeEditPage}>
        <StyledEditButtonText>편집</StyledEditButtonText>
      </StyledEditButton>
      <FlatLists
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        {...rest}
      />
    </StyledHomeLinkCategoriesNav>
  );
}

export default HomeLinkCategoriesNav;
