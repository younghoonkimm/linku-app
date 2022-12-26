import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { LinkType } from "../../App";
import { useDb } from "../../context";

export default function useRealmSearchData(
  searchData: string
): [typeof LinkType[], boolean, Dispatch<SetStateAction<boolean>>] {
  const realm = useDb();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchLinks, setSearchLinks] = useState<typeof LinkType[] | null>(
    null
  );

  useEffect(() => {
    if (searchData) {
      const realmLinks = realm
        .objects("Links")
        .filtered(`title CONTAINS "${searchData && searchData}"`);

      setSearchLinks(realmLinks);
      setSearchLoading(false);
    } else {
      setSearchLinks([]);
    }
  }, [searchData]);

  useEffect(() => {
    let timer: any = null;

    if (searchLoading) {
      timer = setTimeout(() => {
        setSearchLoading(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchLoading]);
  //@ts-ignore
  return [searchLinks, searchLoading, setSearchLoading];
}
