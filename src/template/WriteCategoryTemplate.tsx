import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  NativeModules,
  Platform,
  View,
  findNodeHandle,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { CategoriesType } from "../../App";
import useRealmData from "../hooks/useRealmData";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  DeleteCategoriesModal,
  FloatingSubmitButton,
  WriteCategoriesRenderAction,
  ToastCategoryPopUp,
  WriteCategoriesInput,
  KeyboardAccButton,
} from "../components/molecules";
import { WriteCategoriesRenderItem } from "../components/oraganism";

import { useDb, useTheme } from "../../context";
import { Modals } from "../components/atom";

import { heightPercentage, widthPercentage } from "../hooks/useResponseSize";
import Animated from "react-native-reanimated";

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.mainBgColor};
  overflow: hidden;
`;

export const ShadowBox = styled.View<{ isDisplay: boolean }>`
  /* display: ${(props) => (props.isDisplay ? "flex" : "none")}; */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  /* box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3); */
  background-color: ${(props) => props.theme.mainBgColor};

  z-index: 4;
`;

const { StatusBarManager } = NativeModules;

function WriteCategoryTemplate() {
  const realm = useDb();
  const { isToast, handleToast } = useTheme();
  const navigation = useNavigation();
  const { call, onChange } = Animated;
  const [categories, links] = useRealmData();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [deleteId, setDeleteId] = useState<typeof CategoriesType | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [copyCategories, setCopyCategories] = useState<
    typeof CategoriesType[] | null
  >(null);
  const [editInputId, setEditInputId] = useState<string>("");

  useEffect(() => {
    if (categories === null) return;
    setDeleteId(null);
    setIsDeleteModal(false);

    // 변경필요
    const newArr = [...categories]
      .reduce((acc: typeof CategoriesType[], cur: typeof CategoriesType) => {
        const isExist = copyCategories?.find((copy) => copy._id === cur._id);
        isExist
          ? acc.push({
              _id: cur._id,
              categoryName: cur.categoryName,
              order: isExist.order + "",
            })
          : acc.push(cur);

        return acc;
      }, [])
      .sort(
        (a: typeof CategoriesType, b: typeof CategoriesType) =>
          +a.order - +b.order
      );
    setCopyCategories(newArr);
  }, [categories]);

  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;

    if (isToast) return;
    if (categories?.length > 0) {
      openTimer = setTimeout(() => {
        setIsToastOpen(true);
      }, 800);
    }
    return () => {
      clearTimeout(openTimer);
    };
  }, [isToast, categories]);

  useEffect(() => {
    let closeTimer: ReturnType<typeof setTimeout>;
    if (!isToastOpen) return;
    if (isToastOpen) {
      closeTimer = setTimeout(async () => {
        await handleToast();
        setIsToastOpen(false);
      }, 3000);
    }
    return () => {
      clearTimeout(closeTimer);
    };
  }, [isToastOpen]);

  let row: Array<any> = [];
  let prevOpenedRow: any;

  const closeSwipe = () => {
    prevOpenedRow?.close();
    prevOpenedRow = null;
  };
  const countLink = (item: typeof CategoriesType) => {
    return links.reduce(
      (acc, cur) => (cur.categoryName === item._id ? acc + 1 : acc),
      0
    );
  };

  const handleDragList = (drag: any) => {
    closeSwipe();
    setEditInputId("");
    drag();
  };

  const onDragEnd = (data: typeof CategoriesType[]) => {
    const orderedData = data.map((value, index) => ({
      _id: value._id,
      categoryName: value.categoryName,
      order: index + "",
    }));

    setCopyCategories(orderedData);
  };

  const onSubmit = async () => {
    try {
      await realm.write(() => {
        copyCategories?.forEach((copyCat) => {
          const existCat = categories?.find((cat) => cat._id === copyCat._id);
          if (existCat) {
            existCat.categoryName = copyCat.categoryName;
            //@ts-ignore
            existCat.order = +copyCat.order;
          }
        });
        navigation.navigate("Home", null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMoadl = () => setIsDeleteModal(true);

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(false);
    setDeleteId(null);
  };

  const openModal = (category: typeof CategoriesType) => {
    handleOpenMoadl();
    setDeleteId(category);
  };

  const deleteCategory = async (cat: typeof CategoriesType | null) => {
    if (cat) {
      const { _id } = cat;
      if (_id) {
        const reorderList = copyCategories
          ?.filter((value) => value._id !== _id)
          .map((value, index) => {
            return {
              _id: value._id,
              categoryName: value.categoryName,
              order: index + "",
            };
          });

        await realm.write(() => {
          realm.delete(realm.objectForPrimaryKey("Categories", _id));
        });
        if (reorderList) {
          setCopyCategories(reorderList);
        }
      }
    }
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const listRef = useRef<any>(null);

  useEffect(() => {
    const responder = listRef.current?.getScrollResponder();
    const isFocus = TextInput.State.currentlyFocusedInput();

    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        const coordHeights = e.endCoordinates.height;

        if (responder && isFocus) {
          responder.scrollResponderScrollNativeHandleToKeyboard(
            findNodeHandle(TextInput.State.currentlyFocusedInput()),
            coordHeights - widthPercentage(40),
            true
          );
        }
        setKeyboardVisible(true);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        listRef.current?.scrollToOffset({ animated: true, offset: 0 });
        setKeyboardVisible(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        // setEditInputId("");
      }
    );

    return () => {
      keyboardWillHideListener.remove();
      keyboardWillShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [editInputId]);

  const handleScrollEnd = (e: any) => {
    // if (!isKeyboardVisible && editInputId) {
    //   setEditInputId("");
    //   Keyboard.dismiss();
    // }
  };

  const handleScroll = (e) => {
    if (e <= 0) {
      setIsScrolled(false);
    }

    if (e > 0) {
      setIsScrolled(true);
    }
  };

  const onFocusEditRef = (_id: string) => {
    closeSwipe();
    setEditInputId(_id);
  };

  const onChangeText = (value: string, _id: string) => {
    const changedText = copyCategories?.map((cat) =>
      cat._id === _id
        ? { _id: cat._id, categoryName: value, order: cat.order }
        : cat
    );
    if (changedText) {
      setCopyCategories(changedText);
    }
  };

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData: any) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const closeRow = (index: number) => {
    Keyboard.dismiss();
    setEditInputId("");
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      closeSwipe();
    }
    prevOpenedRow = row[index];
  };

  return (
    <Container>
      <Modals isOpen={isDeleteModal} setIsOpen={setIsDeleteModal}>
        <DeleteCategoriesModal
          deleteId={deleteId}
          deleteCategory={deleteCategory}
          onClose={handleCloseDeleteModal}
        />
      </Modals>
      <Modals
        isOpen={isToastOpen}
        setIsOpen={() => null}
        backdropOpacity={0.01}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <ToastCategoryPopUp />
      </Modals>
      {copyCategories !== null ? (
        <View style={{ flex: 1, overflow: "hidden" }}>
          <ShadowBox
            isDisplay={isScrolled}
            style={{
              shadowColor: isScrolled ? "#000" : "transparent",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.06,
              shadowRadius: 2,
              elevation: 4,
            }}
          />
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={10}
          >
            <Pressable onPress={() => closeSwipe()} style={{ flex: 1 }}>
              <DraggableFlatList
                ref={listRef}
                progressViewOffset={1}
                containerStyle={{
                  flex: 1,
                }}
                onScrollOffsetChange={handleScroll}
                keyboardShouldPersistTaps="handled"
                onMomentumScrollEnd={handleScrollEnd}
                showsVerticalScrollIndicator={false}
                data={copyCategories}
                onDragEnd={({ data }: { data: typeof CategoriesType[] }) =>
                  onDragEnd(data)
                }
                keyExtractor={(item: typeof CategoriesType) => item._id}
                ListHeaderComponent={
                  <WriteCategoriesInput
                    setText={setNewCategory}
                    text={newCategory}
                    setEditInputId={() => {
                      closeSwipe();
                      setEditInputId("");
                    }}
                  />
                }
                ListFooterComponent={
                  <View
                    style={{
                      width: "100%",
                      height: isKeyboardVisible
                        ? heightPercentage(130)
                        : heightPercentage(100),
                    }}
                  />
                }
                renderItem={({ item, drag, index }: any) => (
                  <WriteCategoriesRenderItem
                    item={item}
                    handleDragList={handleDragList}
                    countLink={countLink}
                    drag={drag}
                    ref={(ref: any) => (row[index] = ref)}
                    onSwipeableWillOpen={() => closeRow(index)}
                    onSwipeableOpen={() => closeRow(index)}
                    onFocusEditRef={onFocusEditRef}
                    editInputId={editInputId}
                    onChangeText={onChangeText}
                    renderRightActions={(_: any) =>
                      WriteCategoriesRenderAction(_, item, openModal)
                    }
                  />
                )}
              />
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <ActivityIndicator />
      )}
      <FloatingSubmitButton onPress={onSubmit} text={"저장하기"} />
      <KeyboardAccButton onSubmit={onSubmit} text="저장하기" />
    </Container>
  );
}

export default WriteCategoryTemplate;
