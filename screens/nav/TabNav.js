import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../page/Home";
import { Series } from "../page/Series";
import { Movies } from "../page/Movies";
import { Account } from "../page/Account";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const CustomHeaderBar = (props) => {
  const { navigation, route, options, layout } = props;
  const [searchQry, setSearchQry] = useState(null);

  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={styles.headerFont}>ไออุ่น</Text>
        <View
          style={{
            paddingLeft: 8,
            flex: 1,
            flexDirection: "row-reverse",
            width: "auto",
            height: 40,
            // backgroundColor: "#191919",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TabSearchNav");
              console.log("Go to search page");
            }}
          >
            <Ionicons
              name="search"
              size={32}
              color="#006262"
              style={{ paddingTop: "1%", paddingRight: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CustomHeaderBarAccount = (props) => {
  const { navigation, route, options, layout } = props;
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerFont}>ไออุ่น</Text>
    </View>
  );
};

const ShowHome = ({ navigation }) => {
  console.log("หน้า ShowHome ใน TabNav.js");
  return <Home nav={navigation} />;
};

const Serie = ({ navigation }) => {
  console.log("หน้า Series ใน TabNav.js");
  return <Series nav={navigation} />;
};

const Movie = ({ navigation }) => {
  console.log("หน้า Movies ใน TabNav.js");
  return <Movies nav={navigation} />;
};

const Accounts = ({ navigation }) => {
  console.log("หน้า Account ใน TabNav.js");
  return <Account nav={navigation} />;
};

export const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#9AD3DA",
        tabBarInactiveTintColor: "#191919",
        tabBarStyle: { backgroundColor: "#006262" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ShowHome}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          header: (props) => <CustomHeaderBar {...props} />,
        }}
      />

      <Tab.Screen
        name="Series"
        component={Serie}
        options={{
          title: "Series",
          tabBarIcon: ({ color }) => (
            <Ionicons name="tv" size={24} color={color} />
          ),
          header: (props) => <CustomHeaderBar {...props} />,
        }}
      />

      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="movie-open" size={24} color={color} />
          ),
          header: (props) => <CustomHeaderBar {...props} />,
        }}
      />

      <Tab.Screen
        name="Account"
        component={Accounts}
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          header: (props) => <CustomHeaderBarAccount {...props} />,
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
    paddingLeft: 8,
    paddingRight: 8,
  },
  headerInput: {
    backgroundColor: "#191919",
    paddingLeft: 8,
    width: "85%",
    height: 40,
    color: "white",
    fontSize: 16,
  },
});
