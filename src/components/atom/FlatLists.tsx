import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

interface FlatListsProps {
  data: any;
  renderItem: any;
  [key: string]: any;
}

const StyledFlatLists = styled.FlatList<{
  style?: React.ReactNode;
}>``;

const FlatLists = ({ data, renderItem, ...rest }: FlatListsProps) => {
  return <StyledFlatLists data={data} renderItem={renderItem} {...rest} />;
};

export default FlatLists;
