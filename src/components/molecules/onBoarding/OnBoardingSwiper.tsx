import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from "../../../hooks/useResponseSize";
import { Text, View } from "react-native";
import { Image } from "react-native";
import styled from "styled-components/native";

import Swiper from "react-native-swiper";
import { Buttons } from "../../atom";

const SlideContainer = styled.View`
  flex: 1;
  /* justify-content: space-evenly; */
  background-color: #fff;
  height: ${heightPercentage(340)}px;
`;

const DotContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${heightPercentage(57)}px;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: ${heightPercentage(260)}px;
`;

const DescContainer = styled.View`
  margin-top: ${heightPercentage(14)}px;
  height: ${heightPercentage(66)}px;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const DotIcons = styled(Buttons)<{ isActive: boolean; isLast: boolean }>`
  width: ${(props) =>
    props.isActive ? `${widthPercentage(16)}px` : `${widthPercentage(6)}px`};
  border-radius: ${(props) =>
    props.isActive ? `${widthPercentage(8)}px` : `${widthPercentage(3)}px`};
  height: ${widthPercentage(6)}px;
  background-color: ${(props) => (props.isActive ? "#3e3e3e" : "#d9d9d9")};
  margin-right: ${(props) => (props.isLast ? 0 : `${widthPercentage(7)}px`)};
`;

const DefaultTitle = styled.Text<{ isBold: boolean; isColor: boolean }>`
  font-size: ${fontPercentage(15.5)}px;
  font-weight: ${(props) => (props.isBold ? 700 : 500)};
  color: ${(props) => (props.isColor ? "#5E5EE1" : "#3e3e3e")};
  line-height: ${fontPercentage(21)}px;
`;

const SubText = styled.Text`
  font-size: ${fontPercentage(10)}px;
  color: #919191;
  margin-top: ${heightPercentage(10)}px;
`;

interface OnBoardingSwiperProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

function OnBoardingSwiper({
  currentIndex,
  setCurrentIndex,
}: OnBoardingSwiperProps) {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const swiper = useRef<Swiper>(null);

  useEffect(() => {
    swiper.current?.scrollTo(currentIndex);
  }, [currentIndex]);

  const dat = [0, 1, 2, 3, 4];

  const handleIndex = (index: number) => {
    swiper.current?.scrollTo(index);
    setCurrentIndex(index);
  };

  const onIndexChanged = (index: number) => setCurrentIndex(index);

  return (
    <>
      <DotContainer>
        {dat.map((value) => (
          <DotIcons
            isActive={value === currentIndex}
            key={value}
            onPress={() => handleIndex(value)}
            isLast={value === 4}
          />
        ))}
      </DotContainer>
      <View style={{ width: "100%", height: heightPercentage(356) }}>
        <Swiper
          ref={swiper}
          bounces={true}
          onIndexChanged={onIndexChanged}
          loop={false}
          showsPagination={false}
          removeClippedSubviews={false}
          // paginationStyle={{ top: 0 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <SlideContainer>
            <ImageContainer>
              <Image
                style={{ width: "100%", height: heightPercentage(260) }}
                source={require("../../../../assets/img/onBorading/onboarding1.png")}
              />
            </ImageContainer>
            <DescContainer>
              <DefaultTitle isBold isColor line>
                추가 버튼을 눌러
              </DefaultTitle>
              <DefaultTitle>링크를 등록해보세요.</DefaultTitle>
            </DescContainer>
          </SlideContainer>
          <SlideContainer>
            <ImageContainer>
              <Image
                style={{ width: "100%", height: heightPercentage(260) }}
                source={require("../../../../assets/img/onBorading/onboarding2.png")}
              />
            </ImageContainer>
            <DescContainer>
              <DefaultTitle>복사한 링크를 붙여넣고</DefaultTitle>
              <Text>
                <DefaultTitle isBold isColor>
                  나만의 타이틀로 저장
                </DefaultTitle>
                <DefaultTitle>해보세요.</DefaultTitle>
              </Text>
            </DescContainer>
          </SlideContainer>
          <SlideContainer>
            <ImageContainer>
              <Image
                style={{ width: "100%", height: heightPercentage(260) }}
                source={require("../../../../assets/img/onBorading/onboarding3.png")}
              />
            </ImageContainer>
            <DescContainer>
              <DefaultTitle>카테고리 생성 후</DefaultTitle>
              <Text>
                <DefaultTitle isBold isColor>
                  링크를 구분하여 저장
                </DefaultTitle>
                <DefaultTitle>할 수 있어요.</DefaultTitle>
              </Text>
              <SubText>*카테고리는 7개까지 생성 가능해요.</SubText>
            </DescContainer>
          </SlideContainer>
          <SlideContainer>
            <ImageContainer>
              <Image
                style={{ width: "100%", height: heightPercentage(260) }}
                source={require("../../../../assets/img/onBorading/onboarding4.png")}
              />
            </ImageContainer>
            <DescContainer>
              <DefaultTitle> 홈화면의 편집 버튼을 통해서</DefaultTitle>
              <Text>
                <DefaultTitle isBold isColor>
                  카테고리 추가/편집/삭제
                </DefaultTitle>
                <DefaultTitle>가 가능해요.</DefaultTitle>
              </Text>
            </DescContainer>
          </SlideContainer>
          <SlideContainer>
            <ImageContainer>
              <Image
                style={{ width: "100%", height: heightPercentage(260) }}
                source={require("../../../../assets/img/onBorading/onboarding5.png")}
              />
            </ImageContainer>
            <DescContainer>
              <Text>
                <DefaultTitle isBold isColor>
                  링크를 우측으로 스와이프
                </DefaultTitle>
                <DefaultTitle>하면</DefaultTitle>
              </Text>
              <DefaultTitle>수정하거나 삭제할 수 있어요.</DefaultTitle>
            </DescContainer>
          </SlideContainer>
        </Swiper>
      </View>
    </>
  );
}

export default OnBoardingSwiper;
