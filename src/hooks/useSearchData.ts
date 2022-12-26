import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { SearchSchemaType } from "../../App";
import { useDb } from "../../context";

export default function useSearchData(): [
  typeof SearchSchemaType[],
  boolean,
  Dispatch<SetStateAction<boolean>>
] {
  const realm = useDb();

  const [searchData, setSearchData] = useState<
    typeof SearchSchemaType[] | null
  >(null);

  useEffect(() => {
    const searchedData = realm.objects("Search");

    searchedData.addListener((realLinks: any, changes: any) => {
      setSearchData(realLinks.sorted("date", true));
    });

    return () => {
      searchedData.removeAllListeners();
    };
  }, []);

  //@ts-ignore
  return [searchData];
}
