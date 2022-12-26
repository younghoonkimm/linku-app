import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";

import { CategoriesType } from "../../../../App";
import { Buttons } from "../../atom";
import { CheckIcons, SelectCheckIcons } from "../../svg";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { flexRowAlignCenter } from "../../../style/common";
import useDarkMode from "../../../hooks/useDarkMode";
import { Keyboard } from "react-native";

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledListContainer = styled(Buttons)<{ isActive: boolean }>`
  ${flexRowAlignCenter}
  position: relative;
  justify-content: space-between;
  border-radius: ${fontPercentage(12)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isActive
      ? props.theme.mainColor
      : props.theme.catRenderItemBorderColor};
  margin-top: ${heightPercentage(9)}px;
  padding: ${heightPercentage(14)}px ${widthPercentage(18)}px
    ${heightPercentage(12)}px;
  /* padding: 0 ${widthPercentage(18)}px; */
  /* height: ${heightPercentage(40)}px; */
  background-color: ${(props) => props.theme.mainBgColor};
`;

const StyledListDesc = styled.Text<{ isActive: boolean }>`
  font-size: ${fontPercentage(12)}px;
  font-weight: 400;
  color: ${(props) => props.theme.textDescColor};
`;

const StyledIconContainer = styled.View`
  position: absolute;
  right: ${widthPercentage(15)}px;
  align-self: center;
  /* transform: ${`translateY(-${widthPercentage(9)}px)`}; */
`;

interface WriteLinkCategoriesListProps {
  data: typeof CategoriesType[];
  selectCat: string;
  setSelectCat: Dispatch<SetStateAction<string>>;
}

function WriteLinkCategoriesList({
  data,
  selectCat,
  setSelectCat,
}: WriteLinkCategoriesListProps) {
  const hanldeSelectCat = (_id: string) => {
    setSelectCat((prev) => (prev === _id ? "" : _id));
    Keyboard.dismiss();
  };

  const { isDarkMode } = useDarkMode();
  return (
    <StyledContainer>
      {data?.map((item) => (
        <StyledListContainer
          key={item._id}
          onPress={() => hanldeSelectCat(item._id)}
          isActive={item._id === selectCat}
        >
          <StyledListDesc>{item.categoryName}</StyledListDesc>
          {item._id === selectCat && (
            <StyledIconContainer>
              <SelectCheckIcons
                width={widthPercentage(22)}
                height={widthPercentage(22)}
                color={isDarkMode ? "#6464FF" : "#8378EF"}
              />
            </StyledIconContainer>
          )}
        </StyledListContainer>
      ))}
    </StyledContainer>
  );
}

export default WriteLinkCategoriesList;
