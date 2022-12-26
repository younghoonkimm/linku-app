import React, { useEffect, useState, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SearchTemplate from "../template/SearchTemplate";

function Search({
  navigation: { navigate },
  route: { params },
}: NativeStackScreenProps<any, "Home">) {
  return <SearchTemplate navigate={navigate} params={params} />;
}

export default Search;
