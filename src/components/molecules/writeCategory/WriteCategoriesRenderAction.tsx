import { View, Animated, Pressable } from "react-native";
import styled from "styled-components/native";
import { Buttons } from "../../atom";
import { widthPercentage } from "../../../hooks/useResponseSize";
import { StyledActionButtonText } from "../../../style/writeLinkStyle";
import { CategoriesType } from "../../../../App";

const StyledActionContainer = styled(Animated.View)`
  flex-direction: row;
`;

const StyledActionButton = styled(Buttons)`
  position: relative;
  align-items: center;
  justify-content: center;
  border-top-right-radius: ${widthPercentage(12)}px;
  border-bottom-right-radius: ${widthPercentage(12)}px;
  background-color: ${(props) => `${props.theme.redColor}`};
  width: ${widthPercentage(59)}px;
`;

const StyledDummyBox = styled.View`
  position: absolute;
  left: -20px;
  top: 0;
  width: ${widthPercentage(20)}px;
  height: 100%;
  z-index: 0;
  background-color: ${(props) => `${props.theme.redColor}`};
`;

function WriteCategoriesRenderAction(
  _: any,
  item: typeof CategoriesType,
  deleteModalOpen: (item: typeof CategoriesType) => void
) {
  return (
    <StyledActionContainer
      style={[
        {
          transform: [{ translateX: -widthPercentage(18) }],
        },
      ]}
    >
      <StyledActionButton onPress={() => deleteModalOpen(item)}>
        <StyledDummyBox />
        <StyledActionButtonText>삭제</StyledActionButtonText>
      </StyledActionButton>
    </StyledActionContainer>
  );
}

export default WriteCategoriesRenderAction;
