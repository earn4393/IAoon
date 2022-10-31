import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import regStyles from "../../styles/authStyle";
import AuthInput from "./AuthInput";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthModel from "../../../firebase/authModel";
import * as userModel from "../../../firebase/userModel";
import { addUser } from "../../../redux/slice/userSlice";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Login = (props) => {
  const navigation = props.nav;

  const authList = useSelector((state) => state.user);
  console.log(`authList = ${authList}`);

  const [credential, setCredential] = useState({ email: "", password: "" });

  const setEmail = (text) => {
    setCredential((oldValue) => ({
      ...oldValue,
      email: text,
    }));
  };

  const setPassword = (text) => {
    setCredential((oldValue) => ({
      ...oldValue,
      password: text,
    }));
  };

  const dispatch = useDispatch();

  const success = (doc) => {
    let profile_state = {
      id: doc.id,
      email: doc.data().email,
      username: doc.data().username,
      firstName: doc.data().firstname,
      lastName: doc.data().lastname,
      sex: doc.data().sex,
      img: doc.data().img,
    };
    dispatch(addUser(profile_state));
    navigation.navigate("Account");
    // สำหรับ link ไปหา Account
    // navigation.navigate({
    //   name: "MainDrawer",
    //   params: {
    //     username: doc.data().username,
    //   },
    // });
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const signInSucces = (email) => {
    console.log("sign in succes email = ", email);
    userModel.getUserByUsername(email, success, unsuccess);
    // navigation.navigate("Account");
  };

  const onSignInPress = () => {
    AuthModel.signInEmailPass(
      credential.email,
      credential.password,
      signInSucces,
      unsuccess
    );
    // navigation.navigate("Account");
  };

  // สำหรับไปหน้า Register
  const onSignUpPress = () => {
    // navigation.push("Register");
    navigation.navigate("Register");
  };

  // สำหรับไปหน้าลืมรหัส
  const onForgotPress = () => {
    // navigation.push("Recover");
    navigation.navigate("Recover");
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

        <View
          style={{
            flex: 4,
            padding: 0,
            borderWidth: 0,
            alignItems: "center",
          }}
        ></View>
        <AuthInput
          placeholder="Email"
          secureTextEntry={false}
          value={credential.username}
          onChangeText={(text) => setEmail(text)}
        />
        <AuthInput
          placeholder="Password"
          secureTextEntry={true}
          value={credential.password}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 0,
            borderWidth: 0,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 40,
            }}
            onPress={onSignInPress}
          >
            <Text style={{ fontSize: 20 }}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            paddingTop: 10,
            borderWidth: 0,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 40,
            }}
            onPress={onSignUpPress}
          >
            <Text style={{ fontSize: 20 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 5,
            borderWidth: 0,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <TouchableOpacity onPress={onForgotPress}>
              <Text
                style={{
                  fontSize: 15,
                  color: "blue",
                  textDecorationColor: "blue",
                  textDecorationLine: "underline",
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}></View>
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
