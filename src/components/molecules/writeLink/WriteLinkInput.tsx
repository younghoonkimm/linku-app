import React, { Dispatch, SetStateAction, useRef } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";

import {
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";

import {
  StyledLinkInput,
  StyleTitleLabels,
} from "../../../style/writeLinkStyle";

const StyledLabelInputContainer = styled.Pressable`
  height: ${heightPercentage(63)}px;
  background-color: ${(props) => props.theme.inputBgColor};
  padding: ${heightPercentage(13)}px ${widthPercentage(18)}px;
  border-radius: ${heightPercentage(12)}px;
`;

const StyledWriteLinkInputContainer = styled.View`
  margin-top: ${heightPercentage(6)}px;
`;

interface WriteLinkInputProps {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function WriteLinkInput({ link, setLink }: WriteLinkInputProps) {
  const inputRef = useRef<TextInput | null>(null);

  const inputFocus = () => inputRef.current?.focus();

  return (
    <StyledWriteLinkInputContainer>
      <StyleTitleLabels>링크</StyleTitleLabels>
      <StyledLabelInputContainer onPress={inputFocus}>
        <StyledLinkInput
          ref={inputRef}
          name="link"
          setText={setLink}
          value={link}
          numberOfLines={4}
          multiline
          placeholder="복사한 URL을 붙여 넣으세요"
        />
      </StyledLabelInputContainer>
    </StyledWriteLinkInputContainer>
  );
}

export default WriteLinkInput;
