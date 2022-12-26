import React, { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components/native";
import { TextInput } from "react-native";
import {
  StyleTitleLabels,
  StyledLinkInput,
  StyledCatTitleInputContainer,
} from "../../../style/writeLinkStyle";
import { heightPercentage } from "hooks/useResponseSize";

interface WriteTitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const WriteTitleInputContainer = styled.View`
  margin-top: ${heightPercentage(24)}px;
`;

function WriteTitleInput({ title, setTitle }: WriteTitleInputProps) {
  const inputRef = useRef<TextInput | null>(null);

  const inputFocus = () => inputRef.current?.focus();

  return (
    <WriteTitleInputContainer>
      <StyleTitleLabels>제목</StyleTitleLabels>
      <StyledCatTitleInputContainer onPress={inputFocus}>
        <StyledLinkInput
          ref={inputRef}
          name="title"
          setText={setTitle}
          value={title}
          numberOfLines={1}
          maxLength={30}
          placeholder="나만의 제목을 입력해주세요 (30자이내)"
        />
      </StyledCatTitleInputContainer>
    </WriteTitleInputContainer>
  );
}

export default WriteTitleInput;
