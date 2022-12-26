import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";

const ZEPLIN_WIDTH = 320;
const ZEPLIN_HEIGHT = 568;

export function widthPercentage(width: number): number {
  const percentage = (width / ZEPLIN_WIDTH) * 100;

  return responsiveScreenWidth(percentage);
}

export function heightPercentage(height: number): number {
  const percentage = (height / ZEPLIN_HEIGHT) * 100;

  return responsiveScreenHeight(percentage);
}

export function fontPercentage(size: number, isBig: boolean = false): number {
  const percentage =
    size <= 10 ? (isBig ? size * 0.15 : size * 0.167) : size * 0.15;

  return responsiveScreenFontSize(percentage);
}
