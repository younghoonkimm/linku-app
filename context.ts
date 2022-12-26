import React, { useContext } from "react";

export const DBContext = React.createContext<any | null>(null);

export const useDb = () => useContext(DBContext);

export const OptionContext = React.createContext<any | null>(null);

export const useTheme = () => useContext(OptionContext);
