import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const StyledLabels = styled.Text<{
  style: React.ReactNode;
}>``;

interface LabelsProps {
  text: string;
}

function Labels({ text }: LabelsProps) {
  return <StyledLabels>{text}</StyledLabels>;
}

export default Labels;
