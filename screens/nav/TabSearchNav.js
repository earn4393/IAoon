import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Searchbar,
} from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Search } from "../page/Search";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

// const CustomHeadBarSearch = (props) => {
//   const { navigation, route, options, layout } = props;
//   const DATA = useSelector((state) => state.watch);
//   return (
//     <View style={styles.headerContainer}>
//       <View style={{ flex: 2, flexDirection: "row" }}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack();
//             console.log("Go Home");
//           }}
//         >
//           <Entypo
//             name="chevron-small-left"
//             size={32}
//             color="#006262"
//             style={{ paddingTop: "1%", paddingLeft: "2%" }}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerFont}>ไออุ่น</Text>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("Search");
//             console.log("Go Home");
//           }}
//         >
//           <Ionicons
//             name="search"
//             size={32}
//             color="#006262"
//             style={{ paddingTop: "1%", paddingRight: "2%" }}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

const SearchScreen = ({ navigation }) => {
  console.log("หน้า Search ใน TabNav.js");
  return <Search nav={navigation} />;
};

export const TabSearchNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
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
    paddingLeft: 0,
  },
  headerInput: {
    backgroundColor: "#191919",
    paddingLeft: 8,
    width: 200,
    height: 40,
    color: "white",
    fontSize: 20,
  },
  headerInSearch: {
    paddingLeft: 2,
    flex: 1,
    flexDirection: "row",
    width: "auto",
    height: 40,
    backgroundColor: "#191919",
    marginLeft: "2%",
  },
});
