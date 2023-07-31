import { NativeBaseProvider, extendTheme } from "native-base";
import React from "react";
import RootNavigation from "./src/navigation";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider>
      <RootNavigation />
    </NativeBaseProvider>
  );
}
