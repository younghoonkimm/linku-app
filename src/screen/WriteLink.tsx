import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import WriteLinkTemplate from "../template/WriteLinkTemplate";

function WriteLink({
  route: { params },
}: NativeStackScreenProps<any, "WriteLink" | "UpdateLink">) {
  return <WriteLinkTemplate params={params} />;
}

export default WriteLink;
