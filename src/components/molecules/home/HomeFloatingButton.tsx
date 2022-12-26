import React from "react";
import { FloatingIcons, DeleteFloatingIcons, MoreButtonIcon } from "../../svg";
import styled from "styled-components/native";
import { BottomBlur, Buttons } from "../../atom";

import {
  widthPercentage,
  heightPercentage,
} from "../../../hooks/useResponseSize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDarkMode from "hooks/useDarkMode";

const FloatingButton = styled.TouchableOpacity<{ margin?: boolean }>`
  position: absolute;
  bottom: ${(props) =>
    props.margin ? `${heightPercentage(24)}px` : `${heightPercentage(24)}px`};
  left: 50%;
  transform: ${`translateX(-${widthPercentage(58) / 2}px)`};
  width: ${widthPercentage(58)}px;
  height: ${heightPercentage(58)}px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  z-index: 3;
`;

const FloatingMoreButton = styled.TouchableOpacity<{ margin?: boolean }>`
  position: absolute;
  bottom: ${(props) =>
    props.margin
      ? `${heightPercentage(34.5)}px`
      : `${heightPercentage(34.5)}px`};
  width: ${widthPercentage(32)}px;
  height: ${heightPercentage(32)}px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  z-index: 3;
  left: ${widthPercentage(16)}px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
`;

interface HomeFloatingButtonProps {
  isEditMode: boolean;
  handleWritPage: (path: string) => void;
  handleDeleteModalOpen: () => void;
  isDeleteArray: boolean;
  onClickOutside: any;
}

// const DeleteFloading = (handleDeleteLinkArray) => (
//   <FloatingButton onPress={handleDeleteLinkArray}>
//     <DeleteFloatingIcons
//       width={widthPercentage(61)}
//       height={heightPercentage(61)}
//     />
//   </FloatingButton>
// );

function HomeFloatingButton({
  isEditMode,
  handleWritPage,
  isDeleteArray,
  handleDeleteModalOpen,
  onClickOutside,
}: HomeFloatingButtonProps) {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useDarkMode();

  return (
    <BottomBlur
      height={insets.bottom ? widthPercentage(100) + 34 : widthPercentage(100)}
      onClickOutside={onClickOutside}
    >
      {!isEditMode ? (
        <>
          <FloatingButton
            onPress={() => handleWritPage("WriteLink")}
            margin={insets.bottom}
          >
            <FloatingIcons
              width={widthPercentage(63)}
              height={heightPercentage(63)}
              darkMode={isDarkMode}
            />
          </FloatingButton>
          <FloatingMoreButton
            onPress={() => handleWritPage("Setting")}
            margin={insets.bottom}
          >
            <MoreButtonIcon
              width={widthPercentage(40)}
              height={heightPercentage(40)}
              darkMode={isDarkMode}
            />
          </FloatingMoreButton>
        </>
      ) : (
        <>
          {isDeleteArray && (
            <FloatingButton
              onPress={handleDeleteModalOpen}
              margin={insets.bottom}
            >
              <DeleteFloatingIcons
                width={widthPercentage(58)}
                height={heightPercentage(58)}
                darkMode={isDarkMode}
              />
            </FloatingButton>
          )}
        </>
      )}
    </BottomBlur>
  );
}

export default HomeFloatingButton;
