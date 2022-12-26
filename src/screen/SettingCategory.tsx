import React from "react";
import styled from "styled-components/native";
import WriteCategoryTemplate from "../template/WriteCategoryTemplate";

const Container = styled.View`
  flex: 1;
`;

function SettingCategory() {
  return (
    <Container>
      <WriteCategoryTemplate />
    </Container>
  );
}

export default SettingCategory;
