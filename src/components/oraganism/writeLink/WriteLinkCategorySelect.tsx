import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";

import useRealmData from "../../../hooks/useRealmData";
import { AddCategoryLink, WriteLinkCategoriesList } from "../../molecules";
import {
  StyledSubText,
  StyledCountText,
  StyledTextContainer,
  StyleTitleLabels,
} from "../../../style/writeLinkStyle";

import { heightPercentage } from "../../../hooks/useResponseSize";

interface WriteLinkCategorySelectProps {
  newCat: string;
  setNewCat: Dispatch<SetStateAction<string>>;
  selectCat: string;
  setSelectCat: Dispatch<SetStateAction<string>>;
}

const StyledContainer = styled.View`
  margin-top: ${heightPercentage(24)}px;
`;

function WriteLinkCategorySelect({
  newCat,
  setNewCat,
  selectCat,
  setSelectCat,
}: WriteLinkCategorySelectProps) {
  const [categories] = useRealmData();

  return (
    <StyledContainer>
      <StyleTitleLabels>카테고리</StyleTitleLabels>
      <StyledTextContainer>
        <StyledSubText>링크를 카테고리 별로 저장해보세요</StyledSubText>
        <StyledCountText>(최대 7개)</StyledCountText>
      </StyledTextContainer>

      <AddCategoryLink setText={setNewCat} text={newCat} />

      <WriteLinkCategoriesList
        data={categories}
        selectCat={selectCat}
        setSelectCat={setSelectCat}
      />
    </StyledContainer>
  );
}

export default WriteLinkCategorySelect;
