import { Linking } from "react-native";
import { CategoriesType, LinkType } from "../../App";

export const openURLLink = async (url: string) => {
  let openLink = url;

  if (openLink.slice(0, 8) === "https://") {
    openLink = openLink.replace("https://", "");
  }

  if (openLink.slice(0, 7) === "http://") {
    openLink = openLink.replace("http://", "");
  }

  await Linking.openURL("https://" + openLink);
};

export const sendEmail = async () =>
  await Linking.openURL("mailto:fondue.2022@gmail.com");

export const findCategoryName = (
  item: typeof LinkType,
  categories: typeof CategoriesType[]
): string | undefined =>
  categories?.find((category) => category._id === item.categoryName)
    ?.categoryName;
