import { View, Animated } from "react-native";
import styled from "styled-components/native";
import { Buttons } from "../../atom";
import {
  fontPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { LinkType } from "../../../../App";
import { StyledActionButtonText } from "../../../style/writeLinkStyle";

const StyledActionContainer = styled(Animated.View)`
  flex-direction: row;
`;

const StyledButtonContainer = styled.View`
  position: relative;
  flex-direction: row;
  background-color: ${(props) => `${props.theme.redColor}`};
  border-top-right-radius: ${widthPercentage(12)}px;
  border-bottom-right-radius: ${widthPercentage(12)}px;
`;
const StyledActionButton = styled(Buttons)`
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.actionBoxColor};
  width: ${widthPercentage(59)}px;
`;

const StyledActionDeleteButton = styled(Buttons)`
  position: relative;
  align-items: center;
  justify-content: center;
  width: ${widthPercentage(59)}px;
  border-top-right-radius: ${widthPercentage(12)}px;
  border-bottom-right-radius: ${widthPercentage(12)}px;
  background-color: ${(props) => `${props.theme.redColor}`};
`;

const StyledDummyBox = styled.View`
  position: absolute;
  left: -20px;
  top: 0;
  width: ${widthPercentage(45)}px;
  height: 100%;
  z-index: 0;
  background-color: ${(props) => props.theme.actionBoxColor};
`;

type LinkTypeWithoutDate = Partial<typeof LinkType>;

function HomeLinkRenderActions(
  item: typeof LinkType,
  handleEdit: ({ categoryName, _id, link, title }: LinkTypeWithoutDate) => void,
  deleteLink: (_id: string) => void,
  isEditMode?: boolean
) {
  if (isEditMode) return;

  const { categoryName, _id, link, title } = item;

  const handleEditMode = () => handleEdit({ categoryName, _id, link, title });

  const handleDeleteitem = () => deleteLink(_id);

  // 사용할수도 있음
  // const trans = dragX.interpolate({
  //   inputRange: [0, widthPercentage(18), 100, 101],
  //   outputRange: [-widthPercentage(18), 0, 0, 1],
  // });

  return (
    <StyledActionContainer
      style={{
        transform: [{ translateX: -widthPercentage(18) }],
      }}
    >
      <StyledButtonContainer>
        <StyledActionButton onPress={handleEditMode}>
          <StyledDummyBox />
          <StyledActionButtonText>편집</StyledActionButtonText>
        </StyledActionButton>
        <StyledActionDeleteButton onPress={handleDeleteitem}>
          <StyledActionButtonText>삭제</StyledActionButtonText>
        </StyledActionDeleteButton>
      </StyledButtonContainer>
    </StyledActionContainer>
  );
}

export default HomeLinkRenderActions;
