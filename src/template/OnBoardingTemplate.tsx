import { heightPercentage, widthPercentage } from "../hooks/useResponseSize";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from "styled-components/native";
import {
  StyledFloatingText,
  StyledFloatingSubmitButton,
} from "../style/common";
import { OnBoardingSwiper } from "../components/molecules";

const StyledOnBoardingContainer = styled.View<{ isNotch: boolean }>`
  flex: 1;
  position: relative;
  justify-content: space-between;
  /* padding-bottom: 18px; */
  background-color: #fff;
  padding-top: ${heightPercentage(20)}px;
  padding-bottom: ${(props) =>
    props.isNotch ? `${heightPercentage(28)}px` : `${heightPercentage(18)}px`};
`;

const StyledOnBoardingButton = styled(StyledFloatingSubmitButton)`
  margin: 0 ${widthPercentage(20)}px;
  height: ${widthPercentage(42)}px;
  background-color: #8378ef;
`;

function OnBoarding({ onPress }: any) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastIndex = currentIndex === 4;
  const handlePressButton = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <StyledOnBoardingContainer isNotch={insets.bottom}>
      <View>
        <OnBoardingSwiper
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </View>
      <StyledOnBoardingButton
        onPress={isLastIndex ? onPress : handlePressButton}
      >
        <StyledFloatingText>
          {isLastIndex ? "시작하기" : "다음으로"}
        </StyledFloatingText>
      </StyledOnBoardingButton>
    </StyledOnBoardingContainer>
  );
}

export default OnBoarding;
