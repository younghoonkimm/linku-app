import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  WriteLink,
  Home,
  SearchPage,
  SettingCategory,
  SettingsPage,
} from "../screen";

import Stack from "./stack";
import CustomHeader from "../components/molecules/common/CustomHeader";

const Tabs = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen
        name="UpdateLink"
        component={WriteLink}
        options={{
          headerShown: true,
          header: () => <CustomHeader title="링크 수정" />,
        }}
      />
      <Tabs.Screen name="SearchPage" component={SearchPage} />
      <Tabs.Screen
        name="Setting"
        component={SettingsPage}
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen name="WriteLink" component={Stack} />
      <Tabs.Screen
        name="SettingCategory"
        options={{
          headerShown: true,
          header: () => <CustomHeader title="카테고리 편집" />,
        }}
        component={SettingCategory}
      />
    </Tabs.Navigator>
  );
}
