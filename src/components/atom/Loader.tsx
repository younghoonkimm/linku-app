import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: ${(props) => props.theme.mainColor}; */
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <ActivityIndicator />
    </LoaderWrapper>
  );
};

export default Loader;
