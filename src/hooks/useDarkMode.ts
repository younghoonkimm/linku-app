import { useTheme } from "../../context";

export default function useDarkMode() {
  const { darkMode } = useTheme();

  const isDarkMode = darkMode === "dark";

  return { isDarkMode };
}
