import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../page/Home";
import { Series } from "../page/Series";
import { Movies } from "../page/Movies";
import { Account } from "../page/Account";
import { Detail } from "../page/Detail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const CustomHeaderBar = (props) => {
  const { navigation, route, options, layout } = props;
  // console.log("options: ", options);
  return (
    <View style={styles.headerContainer}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={styles.headerFont}>ไออุ่น</Text>
        <View
          style={{
            paddingLeft: 8,
            flex: 1,
            flexDirection: "row",
            width: "auto",
            height: 40,
            backgroundColor: "#191919",
          }}
        >
          <TextInput
            style={styles.headerInput}
            placeholder="ค้นหา"
            placeholderTextColor="#191919"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
              console.log("Hello");
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

const Description = ({ navigation }) => {
  console.log("หน้า Description ใน TabNav.js");
  return <Detail nav={navigation} />;
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
        }}
      />

      <Tab.Screen
        name="Description"
        component={Description}
        options={{
          title: "Description",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
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
    fontSize: 20,
  },
});
