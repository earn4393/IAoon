import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import AuthInput from "./AuthInput";
import * as AuthModel from "../../../firebase/authModel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Recover = (props) => {
  const navigation = props.nav;

  const [email, setEmail] = useState("");

  const unsuccess = (msg) => {
    Alert.alert(msg);
  };

  // กลับไปที่หน้า login
  const success = (msg) => {
    Alert.alert(msg);
    navigation.navigate("Account");
  };

  const onSendPress = () => {
    console.log(`Send email to ${email}`);
    AuthModel.recoverPassword(email, success, unsuccess);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      >
        <View style={{ flex: 0.75 }}></View>

        <View style={styles.backgroundButton}>
          <View style={{ padding: 25 }}>
            <MaterialCommunityIcons
              name="email-multiple-outline"
              size={100}
              color="white"
            />
          </View>
          <AuthInput
            placeholder="Email"
            secureTextEntry={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TouchableOpacity style={styles.button} onPress={onSendPress}>
            <Text style={{ fontSize: 20 }}>Recover</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.75 }}></View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  box: {
    flex: 2,
    margin: 0,
    color: "black",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageHead: {
    width: parseInt(WIDTH),
    height: 250,
    marginBottom: 10,
  },
  countryBar: {
    backgroundColor: "#FAA307",
    width: "100%",
    height: "auto",
    paddingLeft: 8,
  },
  imagetitle: {
    width: parseInt(WIDTH / 2),
    height: 250,
    marginBottom: 10,
  },
  itemlist: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  button: {
    margin: 10,
    backgroundColor: "#FAA307",
    height: 48,
    width: 350,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  backgroundButton: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderRadius: 10,
    margin: 8,
    alignItems: "center",
  },
});
