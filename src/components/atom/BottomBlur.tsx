import React, { useMemo } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentage } from "../../hooks/useResponseSize";
import { useTheme } from "../../../context";

const StyledBottomBlur = styled(LinearGradient)<{ height: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  justify-content: flex-end;
  padding-bottom: ${widthPercentage(18)}px;
  //Todo height 논의 필요
  height: ${(props) => props.height}px;
`;

interface BottomBlurProps {
  height: number;
  children?: React.ReactNode;
  onClickOutside: any;
}

function BottomBlur({ height, children, onClickOutside }: BottomBlurProps) {
  const theme = useTheme();
  const { darkMode } = theme;

  const burColors = useMemo(
    () =>
      darkMode === "dark"
        ? ["rgba(28,28,29,0)", "rgba(28,28,29,1)"]
        : ["rgba(255,255,255,0)", "rgba(255,255,255,1)"],
    [darkMode]
  );
  return (
    <Pressable onPress={onClickOutside}>
      <StyledBottomBlur height={height} colors={burColors}>
        {children}
      </StyledBottomBlur>
    </Pressable>
  );
}

export default BottomBlur;
