import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Splash } from "../Splash";
import { TabNav } from "./TabNav";
import { TabSearchNav } from "./TabSearchNav";
import { PlayTabNav } from "./PlayTabNav";
// import { Search } from "../page/Search";


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

const PlayTabScreen = () => {
  console.log("หน้า VideoPlay ใน StackNav.js");
  return <PlayTabNav />;
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
      <Stack.Screen
        name="PlayTabNav"
        component={PlayTabScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};