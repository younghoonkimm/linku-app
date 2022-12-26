import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeTemplate from "../template/HomeTemplate";

function Home({
  navigation: { navigate },
}: NativeStackScreenProps<any, "Home">) {
  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   accessible={false}
    // >
    <HomeTemplate navigate={navigate} />
    // </TouchableWithoutFeedback>
  );
}

export default Home;
