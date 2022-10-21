import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNav } from "./screens/nav/StackNav";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}
