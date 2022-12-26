import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainBgColor: string;
    mainColor: string;
    textColor: string;
    accentColor: string;
    inputBgColor: string;
    borderColor: string;
    descColor: string;
    secondaryColor: string;
    redColor: string;
    textDescColor: string;
    tagTextColor: string;
    tagBgColor: string;
    homeSortModalBoder: string;
    checkBoxBorderColor: string;
    actionBoxColor: string;
    headerBackColor: string;
    catRenderItemColor: string;
    catRenderItemBorderColor: string;
    homeNavBorderColor: string;
    sortDeleteColor: string;
    settingDisabledColor: string;
    searchTextColor: string;
    floatingBtnColor: string;
    noLinkBoldColor: string;
    noLinkText: string;
    dimmedDeleteBtn: string;
  }
}

declare module "Swiper";
