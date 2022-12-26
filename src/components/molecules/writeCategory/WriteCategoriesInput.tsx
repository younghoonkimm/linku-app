import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components/native";
import {
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import AddCategoryLink from "../common/AddCategoryLink";

const StyledAddCategoryContainer = styled.View`
  padding: 0 ${widthPercentage(16)}px;
  margin-top: 30px;
  margin-bottom: ${heightPercentage(9)}px;
`;

interface WriteCategoriesInputProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setEditInputId?: () => void;
}
function WriteCategoriesInput({
  text,
  setText,
  setEditInputId,
}: WriteCategoriesInputProps) {
  return (
    <StyledAddCategoryContainer>
      <AddCategoryLink
        setText={setText}
        text={text}
        setEditInputId={setEditInputId}
      />
    </StyledAddCategoryContainer>
  );
}

export default WriteCategoriesInput;
