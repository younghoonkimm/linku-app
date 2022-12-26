import React, { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

interface useSwipableRefReturn {
  resetSwiperble: () => void;
  onSwipeableOpen: (_: any, swipeable: any) => void;
}

export default function useSwipableRef(): useSwipableRefReturn {
  const openedRow = useRef<Swipeable | null>(null);

  const closeSwiperble = () => openedRow.current?.close();

  const setNullSwiperble = () => (openedRow.current = null);

  const resetSwiperble = () => {
    closeSwiperble();
    setNullSwiperble();
  };

  const onSwipeableOpen = (_: any, swipeable: any) => {
    closeSwiperble();
    openedRow.current = swipeable;
  };

  return { resetSwiperble, onSwipeableOpen };
}
