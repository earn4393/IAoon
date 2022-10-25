import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Splash } from "../Splash";
import { TabNav } from "./TabNav";
import { TabSearchNav } from "./TabSearchNav";
import { Search } from "../page/Search";

const Stack = createNativeStackNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const SplashScreen = ({ navigation }) => {
  console.log("หน้า splash ใน StackNav.js");
  return <Splash nav={navigation} />;
};

const TabScreen = () => {
  console.log("หน้า TabNav ใน StackNav.js");
  return <TabNav />;
};

const TabSearchScreen = () => {
  console.log("หน้า Search ใน StackNav.js");
  return <TabSearchNav />;
};

export const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNav"
        component={TabScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabSearchNav"
        component={TabSearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight + 10,
    height: parseInt(HEIGHT * 0.1),
    width: "100%",
    backgroundColor: "black",
  },
  headerFont: {
    fontSize: 25,
    color: "#FAA307",
    paddingLeft: 8,
  },
  headerInput: {
    backgroundColor: "#191919",
    paddingLeft: 8,
    width: 200,
    height: 40,
    color: "white",
    fontSize: 20,
  },
});
