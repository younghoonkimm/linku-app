import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CategoriesType, LinksSchema, LinkType } from "../../App";
import { useDb } from "../../context";
import { sortOptionLists } from "../helper/home";

export default function useRealmData(
  sortData: number = 0,
  tabData?: string
): [
  typeof CategoriesType[],
  typeof LinkType[],
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const realm = useDb();
  const [linkLoading, setLinkLoading] = useState(false);
  const [categories, setCateogories] = useState<typeof CategoriesType[] | null>(
    null
  );
  const [links, setLinks] = useState<typeof LinkType[] | null>(null);

  useEffect(() => {
    const isTabDataAndNotAll = tabData && tabData !== "all";
    const sortValue = sortOptionLists[sortData]?.option;

    const realmLinks = realm.objects("Links");

    const reRederLinks = (realLinks: any) =>
      isTabDataAndNotAll
        ? realmLinks
            .filtered(`categoryName = "${tabData}"`)
            .sorted(sortValue[0], sortValue[1])
        : realLinks.sorted(sortValue[0], sortValue[1]);

    realmLinks.addListener((realLinks: any, changes: any) => {
      setLinks(reRederLinks(realLinks));
    });

    return () => {
      realmLinks.removeAllListeners();
    };
  }, [sortData, tabData]);

  useEffect(() => {
    let timer: any = null;

    if (linkLoading) {
      timer = setTimeout(() => {
        setLinkLoading(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [linkLoading]);

  useEffect(() => {
    const realmCategories = realm.objects("Categories");

    realmCategories.addListener((realCat: any, changes: any) => {
      setCateogories(realCat.sorted("order", false));
    });
    return () => {
      realmCategories.removeAllListeners();
    };
  }, []);

  //@ts-ignore
  return [categories, links, linkLoading, setLinkLoading];
}
