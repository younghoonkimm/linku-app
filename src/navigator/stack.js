import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import WriteLink from "../screen/WriteLink";
import CustomHeader from "../components/molecules/common/CustomHeader";

const NativeStack = createNativeStackNavigator();

export default function Stack({ navigation: { navigate } }) {
  const isDarkMode = useColorScheme() === "dark";

  //   const { lightBlack, yellow, white, black } = palette;
  return (
    <NativeStack.Navigator
      //   sceneContainerStyle={{
      //     backgroundColor: isDarkMode ? lightBlack : white,
      //   }}
      screenOptions={{
        headerBackTitle: "sdds",
        // headerStyle: {
        //   backgroundColor: isDarkMode ? lightBlack : white,
        // },
        // headerTitleStyle: {
        //   color: isDarkMode ? "#ffa801" : black,
        // },
        //   presentation: "modal",
        //   animation: "flip",
        //   headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen
        name="링크 등록"
        component={WriteLink}
        options={{
          header: () => <CustomHeader title="링크 등록" />,
        }}
      />
    </NativeStack.Navigator>
  );
}
