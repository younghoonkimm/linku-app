import { useState } from "react";
import { Keyboard } from "react-native";

export default function useScrolled() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScrolled = (e: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;

    // if (contentSize.height > layoutMeasurement.height) {
    if (contentOffset.y <= 4) {
      setIsScrolled(false);
    }

    if (contentOffset.y > 4) {
      setIsScrolled(true);
    }
    // }
  };

  return { isScrolled, handleScrolled };
}
