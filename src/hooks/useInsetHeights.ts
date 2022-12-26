import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useInsetHeights(): {
  insetAndHeaderHeight: number;
  top: number;
  headerHeight: number;
} {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { top } = insets;
  const insetAndHeaderHeight = top + headerHeight;
  return { insetAndHeaderHeight, top, headerHeight };
}
