import DraggableFlatList from "react-native-draggable-flatlist";

import listenToKeyboardEvents from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareHOC";

const config = {
  enableOnAndroid: true,
  enableAutomaticScroll: true,
};

export default listenToKeyboardEvents(config)(DraggableFlatList);
