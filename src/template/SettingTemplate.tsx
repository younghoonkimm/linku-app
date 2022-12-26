import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../hooks/useResponseSize";
import React, { useEffect, useState } from "react";
import { Pressable, Switch, View } from "react-native";
import { Image } from "react-native";
import { flexRowAlignCenter } from "../style/common";
import { StyledItemView } from "../style/writeLinkStyle";
import styled from "styled-components/native";
import { SettingArrowIcon } from "../components/svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context";
import { openURLLink, sendEmail } from "../utils/openLink";

const StyledSettingContainer = styled.View<{ isPaddingBottom: boolean }>`
  padding-bottom: ${(props) =>
    props.isPaddingBottom
      ? `${heightPercentage(31)}px`
      : `${heightPercentage(18)}px`};
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const StyledSettingItem = styled(StyledItemView)<{
  nomargin: boolean;
}>`
  ${flexRowAlignCenter}
  position: relative;
  padding: ${heightPercentage(14)}px ${widthPercentage(18)}px
    ${heightPercentage(13)}px ${widthPercentage(18)}px;
  justify-content: space-between;
  margin-top: ${(props) => (props.nomargin ? 0 : `${heightPercentage(9)}px`)};
`;

const StyledSettingItemText = styled.Text<{ disabled: boolean }>`
  font-size: ${fontPercentage(12)}px;
  color: ${(props) =>
    props.disabled
      ? props.theme.settingDisabledColor
      : props.theme.textDescColor};
`;

function SettingTemplate() {
  const [isEnabled, setIsEnabled] = useState<boolean>();

  const insets = useSafeAreaInsets();

  const { darkMode, setDarkMode } = useTheme();

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    try {
      const status = isEnabled ? "light" : "dark";
      await AsyncStorage.setItem("darkMode", status);
      setDarkMode(status);
    } catch (e) {
      // save error
    }
  };

  useEffect(() => {
    if (darkMode === "light") {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, []);

  const handleOpenReview = async () =>
    await openURLLink("apps.apple.com/app/6444695200?action=write-review");

  return (
    <StyledSettingContainer isPaddingBottom={Boolean(insets.bottom)}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            width: widthPercentage(78),
            height: heightPercentage(98),
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/img/logo.png")}
            // width={widthPercentage(52)}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
        }}
      >
        <StyledSettingItem nomargin>
          <StyledSettingItemText disabled>현재버전 1.0.2</StyledSettingItemText>
        </StyledSettingItem>
        <StyledSettingItem>
          <StyledSettingItemText>다크모드</StyledSettingItemText>
          <Switch
            trackColor={{ false: "#767577", true: "rgb(131, 120, 239)" }}
            thumbColor={"#fff"}
            style={{
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
              position: "absolute",
              right: widthPercentage(12),
              alignSelf: "center",
              // bottom: "-5%",
            }}
            ios_backgroundColor="#e0e0e0"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </StyledSettingItem>
        <Pressable onPress={handleOpenReview}>
          <StyledSettingItem>
            <StyledSettingItemText>앱평가</StyledSettingItemText>
            <View
              style={{
                position: "absolute",
                width: widthPercentage(22),
                height: widthPercentage(24),
                right: widthPercentage(14),
                alignSelf: "center",
              }}
            >
              <SettingArrowIcon
                width={widthPercentage(24)}
                height={widthPercentage(24)}
              />
            </View>
          </StyledSettingItem>
        </Pressable>
        <Pressable onPress={() => sendEmail()}>
          <StyledSettingItem>
            <StyledSettingItemText>문의하기</StyledSettingItemText>
            <View
              style={{
                position: "absolute",
                width: widthPercentage(22),
                height: widthPercentage(24),
                right: widthPercentage(14),
                alignSelf: "center",
              }}
            >
              <SettingArrowIcon
                width={widthPercentage(24)}
                height={widthPercentage(24)}
              />
            </View>
          </StyledSettingItem>
        </Pressable>
      </View>
    </StyledSettingContainer>
  );
}

export default SettingTemplate;
