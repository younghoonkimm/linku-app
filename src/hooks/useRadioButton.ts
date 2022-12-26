import { useState } from "react";

export default function useRadioButton(defaultData: string) {
  const [select, setSelect] = useState<string>(defaultData);

  return [select, setSelect];
}
