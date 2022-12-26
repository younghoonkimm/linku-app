import React, { useState, useRef, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  AppState,
  FlatList,
  Pressable,
  View,
  Alert,
} from "react-native";

import useRealmData from "../hooks/useRealmData";
import { CategoriesType, LinkType } from "../../App";
import { useDb, useTheme } from "../../context";
import {
  HomeLinkList,
  HomeLinkCategoriesButton,
  HomeFloatingButton,
  HomeLinkRenderActions,
  HomeSortModal,
  HomeLinkDeleteModal,
} from "../components/molecules";

import {
  HomeLinkListRenderItem,
  HomeLinkCategoriesNav,
  HomeSortAndDeleteForm,
  HomeInputContainer,
} from "../components/oraganism";
import { Modals } from "../components/atom";
import { HomeLinkRenderItemParmaProps } from "../components/oraganism/home/HomeLinkListRenderItem";
import { HomeLinkCategoriesButtonProps } from "../components/molecules/home/HomeLinkCategoriesButton";
import { sortOptionLists } from "../helper/home";

import { CommonContainer } from "../style/common";
import { openURLLink, findCategoryName } from "../utils/openLink";

import OnBoardingTemplate from "./OnBoardingTemplate";
import useScrolled from "../hooks/useScrolled";
import { PERMISSIONS, request } from "react-native-permissions";

function HomeTemplate({ navigate }: any) {
  const realm = useDb();

  const [tab, setTab] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<number>(
    sortOptionLists[0].value
  );
  const [isSort, setIsSort] = useState<boolean>(false);
  const { isScrolled, handleScrolled } = useScrolled();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  // const [deleteMode, setDeleteMode] = useState(false);
  const [deleteArray, setDeleteArray] = useState<string[]>([]);

  const { isStarted, handleStarted } = useTheme();

  const [categories, links, refreshing, setRefreshing] = useRealmData(
    sortOption,
    tab
  );
  const navigation = useNavigation<NativeStackNavigationProp<any, "Home">>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchText("");
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  let row: Array<any> = [];
  let prevOpenedRow: any;

  const closeSwipe = () => {
    prevOpenedRow?.close();
    prevOpenedRow = null;
  };

  const linkListsRef = useRef<FlatList>(null);

  const handleSearchText = (value: string) => setSearchText(value);

  const handleOpenLink = async (url: string) => {
    if (isEditMode) return;

    if (prevOpenedRow) return closeSwipe();
    await openURLLink(url);
  };

  let timer: any;

  const onRefresh = async () => {
    setRefreshing(true);

    closeSwipe();
  };

  const onLinkReachEnd = () => {
    timer = setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 200);
  };

  const resetEditMode = () => {
    setDeleteArray([]);
    setIsEditMode(false);
  };

  const deleteLink = (_id: string) =>
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey("Links", _id));
    });

  const onCloseDeleteModal = () => setIsConfirmModal(false);
  const deleteLinks = async () => {
    const deleteArrayFilterText = deleteArray
      .map((id) => `_id = "${id}"`)
      .join(" OR ");

    const realmLinks = realm.objects("Links").filtered(deleteArrayFilterText);

    await realm.write(() => {
      realm.delete(realmLinks);
    });

    resetEditMode();
    setIsConfirmModal(false);
  };

  const resetAllAction = () => {
    closeSwipe();
    resetEditMode();
  };

  const handleTabs = (catId: string) => {
    resetAllAction();
    setTab(catId);
  };

  useEffect(() => {
    linkListsRef.current?.scrollToOffset({
      animated: false,
      offset: 0,
    });
  }, [links]);

  const handleWritPage = (path: string) => {
    navigate(path);
    resetAllAction();
  };

  const handleEditMode = () => {
    if (links.length === 0) return;
    closeSwipe();
    setIsEditMode(true);
  };

  const handleEdit = ({ categoryName, _id, link, title }: any) => {
    navigation.navigate("UpdateLink", {
      screen: "UpdateLink",
      params: { _id, categoryName, link, title },
    });
    closeSwipe();
  };

  const selectAllDeleteArray = () =>
    setDeleteArray(links.slice(0, 10 * page).map((link) => link._id));

  const isDeleteArray = deleteArray.length > 0;

  const handleSortOption = (value: number) => {
    setSortOption(value);
    closeSwipe();
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      closeSwipe();
    }
    prevOpenedRow = row[index];
  };

  return isStarted ? (
    <CommonContainer>
      <Modals isOpen={isConfirmModal} setIsOpen={setIsConfirmModal}>
        <HomeLinkDeleteModal
          onClose={onCloseDeleteModal}
          onDeleteLinks={deleteLinks}
          deleteArrayLength={deleteArray.length}
        />
      </Modals>
      <Modals isOpen={isSort} setIsOpen={setIsSort}>
        <HomeSortModal
          sortOption={sortOption}
          setSortOption={handleSortOption}
        />
      </Modals>
      <Pressable onPress={() => closeSwipe()} style={{ flex: 1 }}>
        <HomeInputContainer
          text={searchText}
          setText={handleSearchText}
          onSearch
        />

        <HomeLinkCategoriesNav
          data={
            categories
              ? [{ _id: "all", categoryName: "전체" }, ...categories]
              : [{ _id: "all", categoryName: "전체" }]
          }
          keyExtractor={({ _id }: typeof CategoriesType) => _id + ""}
          resetAction={resetAllAction}
          closeSwipe={closeSwipe}
          renderItem={({ item, index }: HomeLinkCategoriesButtonProps) => (
            <HomeLinkCategoriesButton
              item={item}
              onPress={() => handleTabs(item._id)}
              tab={tab}
              last={index === categories?.length}
            />
          )}
        />

        <HomeSortAndDeleteForm
          isEditMode={isEditMode}
          setIsEditMode={handleEditMode}
          setEditMode={setIsEditMode}
          setIsSort={setIsSort}
          isScrolled={isScrolled && !refreshing}
          sortOption={sortOption}
          isDeleteArray={isDeleteArray}
          resetDeleteArray={resetEditMode}
          selectAllDeleteArray={selectAllDeleteArray}
          isEmpty={links?.length === 0 && links !== null}
        />
        {links !== null ? (
          <HomeLinkList
            ref={linkListsRef}
            onScroll={handleScrolled}
            onMomentumScrollEnd={handleScrolled}
            refreshing={refreshing}
            onRefresh={onRefresh}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            data={links.slice(0, 10 * page)}
            extraData={links}
            onEndReached={onLinkReachEnd}
            keyExtractor={({ _id }: typeof LinkType) => _id + ""}
            renderItem={({ item, index }: HomeLinkRenderItemParmaProps) => (
              <HomeLinkListRenderItem
                onPress={handleOpenLink}
                ref={(ref: any) => (row[index] = ref)}
                item={item}
                index={index}
                categoryName={findCategoryName(item, categories)}
                isEditMode={isEditMode}
                deleteArray={deleteArray}
                setDeleteArray={setDeleteArray}
                onSwipeableWillOpen={() => closeRow(index)}
                renderRightActions={() =>
                  HomeLinkRenderActions(
                    item,
                    handleEdit,
                    deleteLink,
                    isEditMode
                  )
                }
              />
            )}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <ActivityIndicator />
          </View>
        )}
      </Pressable>
      <HomeFloatingButton
        onClickOutside={closeSwipe}
        handleWritPage={handleWritPage}
        isEditMode={isEditMode}
        handleDeleteModalOpen={() => setIsConfirmModal(true)}
        // handleDeleteLinkArray={deleteLinks}
        isDeleteArray={isDeleteArray}
      />
    </CommonContainer>
  ) : (
    <OnBoardingTemplate onPress={handleStarted} />
  );
}

export default HomeTemplate;
