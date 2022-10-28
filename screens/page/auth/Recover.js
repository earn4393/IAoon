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
import * as userModel from "../../../firebase/userModel";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Recover = (props) => {
  const navigation = props.nav;

  const [email, setEmail] = useState("");

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  // กลับไปที่หน้า login
  const success = (msg) => {
    Alert.alert(msg);
    navigation.navigate('ChangePassword')
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
        <View style={{ flex: 1 }}></View>

        <AuthInput
          placeholder="Email"
          secureTextEntry={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            borderRadius: 40,
          }}
          onPress={onSendPress}
        >
          <Text style={{ fontSize: 30 }}>Recover</Text>
        </TouchableOpacity>

        <View style={{ flex: 3 }}></View>
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
});
