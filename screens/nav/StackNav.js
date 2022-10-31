import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { Splash } from "../Splash";
import { TabNav } from "./TabNav";
import { TabSearchNav } from "./TabSearchNav";
import { PlayTabNav } from "./PlayTabNav";
import { Register } from "../page/auth/Register";
import { Recover } from "../page/auth/Recover";
import { ChangePassword } from "../page/auth/ChangePassword";

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

const PlayTabScreen = ({ navigation, route }) => {
  console.log("หน้า VideoPlay ใน StackNav.js");
  return <PlayTabNav nav={navigation} route={route} />;
};

const RegisterScreen = ({ navigation }) => {
  console.log("หน้า Register ใน StackNav.js");
  return <Register nav={navigation} />;
};

const RecoverScreen = ({ navigation }) => {
  console.log("หน้า Recover ใน StackNav.js");
  return <Recover nav={navigation} />;
};

const ChangePasswordScreen = ({ navigation }) => {
  console.log("หน้า ChangePassword ใน StackNav.js");
  return <ChangePassword nav={navigation} />;
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
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "#FAA307",
        }}
      />
      <Stack.Screen
        name="Recover"
        component={RecoverScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "#FAA307",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "#FAA307",
        }}
      />
    </Stack.Navigator>
  );
};
