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
import { VideoPlay } from "../page/VideoPlay";

const Tab = createBottomTabNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const CustomHeadBarVideo = (props) =>{
  const { navigation, route, options, layout } = props;
  return(
    <View style={styles.headerContainer}>
      <View style={{ flex: 2, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              console.log("Go Home Form VideoPlay");
            }}
          >
            <Entypo
              name="chevron-small-left"
              size={32}
              color="#006262"
              style={{ paddingTop: "1%", paddingLeft: "2%" }}
            />
          </TouchableOpacity>
          <Text style={styles.headerFont}>ไออุ่น</Text>
      </View>
    </View>
  )
}

const VideoPlayScreen = ({ navigation }) => {
  console.log("หน้า Video ใน PlayTabNav.js");
  return <VideoPlay nav={navigation} />;
};

export const PlayTabNav = () => {
    return (
      <Tab.Navigator>
  
        <Tab.Screen
          name="VideoPlay"
          component={VideoPlayScreen}
          options={{
            header: (props) => <CustomHeadBarVideo {...props} />,
            tabBarStyle: { display: "none" },
            // tabBarVisible: false
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
  });