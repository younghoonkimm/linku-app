import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Realm from "realm";
import { ThemeProvider } from "styled-components/native";
import { DBContext, OptionContext } from "./context";
import Navigator from "./src/navigator";
import { darkThemes, lightThemes } from "./src/style/color";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, StatusBar, Platform, Alert } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";
function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export const SearchSchema = {
  name: "Search",
  properties: {
    _id: "string",
    searchText: "string",
    date: "int",
  },
  primaryKey: "_id",
};

export const LinksSchema = {
  name: "Links",
  properties: {
    _id: "string",
    link: "string",
    title: "string",
    categoryName: "string",
    date: "int",
  },
  primaryKey: "_id",
};

export const CategoriesSchema = {
  name: "Categories",
  properties: {
    _id: "string",
    categoryName: "string",
    order: "int",
  },
  primaryKey: "_id",
};

export const LinkType = LinksSchema.properties;
export const CategoriesType = CategoriesSchema.properties;
export const SearchSchemaType = SearchSchema.properties;
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [realm, setRealm] = useState(null);
  const [darkMode, setDarkMode] = useState("");

  const startLoading = async () => {
    try {
      const connection = await new Realm.open({
        schema: [LinksSchema, CategoriesSchema, SearchSchema],
      });
      setRealm(connection);

      const storageVal = await AsyncStorage.multiGet([
        "rendered",
        "darkMode",
        "isToast",
      ]);

      storageVal[1][1] ? setDarkMode(storageVal[1][1]) : setDarkMode("light");
      storageVal[0][1] === "rendered"
        ? setIsStarted(true)
        : setIsStarted(false);
      storageVal[2][[1]] === "toasted" ? setIsToast(true) : setIsToast(false);

      const imageAssets = cacheImages([
        require("./assets/img/logo.png"),
        require("./assets/img/onBorading/onboarding1.png"),
        require("./assets/img/onBorading/onboarding2.png"),
        require("./assets/img/onBorading/onboarding3.png"),
        require("./assets/img/onBorading/onboarding4.png"),
        require("./assets/img/onBorading/onboarding5.png"),
      ]);

      await Promise.all([...imageAssets]);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.warn(error);
    } finally {
      setAppIsReady(true);
    }
  };

  const handleToast = async () => {
    await AsyncStorage.setItem("isToast", "toasted");
    setIsToast(true);
  };

  const handleStarted = async () => {
    await AsyncStorage.setItem("rendered", "rendered");
    await realm.write(() => {
      realm.create("Links", {
        title: "링쿠(LinkU)를 소개합니다💜",
        categoryName: "",
        date: Date.now(),
      });
    });
    setIsStarted(true);
  };

  useEffect(() => {
    startLoading();
  }, []);

  const requestTrackingPermission = () =>
    request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
      .then((result) => result)
      .catch((error) => Alert.alert(error));

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }

    const listener = AppState.addEventListener("change", (status) => {
      if (status === "active" && appIsReady && isStarted) {
        requestTrackingPermission();
      }
    });

    return () => {
      listener?.remove();
    };
  }, [appIsReady]);

  useEffect(() => {
    if (isStarted && AppState.currentState === "active") {
      requestTrackingPermission();
    }
  }, [isStarted]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: darkMode === "dark" ? "#1E1E1E" : "#fff",
        }}
        onLayout={onLayoutRootView}
        edges={["top", "right", "left"]}
      >
        <StatusBar
          barStyle={darkMode === "dark" ? "light-content" : "dark-content"}
        />

        <DBContext.Provider value={realm}>
          <OptionContext.Provider
            value={{
              darkMode,
              setDarkMode,
              isStarted,
              handleStarted,
              isToast,
              handleToast,
            }}
          >
            <ThemeProvider
              theme={darkMode === "dark" ? darkThemes : lightThemes}
            >
              <NavigationContainer>
                <Navigator />
              </NavigationContainer>
            </ThemeProvider>
          </OptionContext.Provider>
        </DBContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
