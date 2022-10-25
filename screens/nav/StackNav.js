import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Splash } from "../Splash";
import { TabNav } from "./TabNav";
import { Search } from "../page/Search";

const Stack = createNativeStackNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const SearchHeaderBar = (props) => {
  // const { navigation, route, options, layout } = props;
  console.log("options: ", options);
  return (
    <View
      style={{
        backgroundColor: "white",
        width: 500,
        height: parseInt(HEIGHT * 0.1),
      }}
    >
      <Text>555555</Text>
    </View>
  );
};

const SplashScreen = ({ navigation }) => {
  console.log("หน้า splash ใน StackNav.js");
  return <Splash nav={navigation} />;
};

const TabScreen = () => {
  console.log("หน้า TabNav ใน StackNav.js");
  return <TabNav />;
};

// const SearchScreen = ({ navigation }) => {
//   console.log("หน้า Search ใน StackNav.js");
//   return <Search nav={navigation} />;
// };

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
      {/* <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "ไออุ่น",
          headerBackTitleStyle: () => {
            <Entypo name="home" size={50} color="white" />;
          },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#FAA307",
          // headerShown: true ,
          // header: (props) => <SearchHeaderBar {...props} />,
        }}
      /> */}
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
