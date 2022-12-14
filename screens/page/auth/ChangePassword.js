import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthModel from "../../../firebase/authModel";
import { useSelector } from "react-redux";
import AuthInput from "./AuthInput";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const ChangePassword = (props) => {
  const navigation = props.nav;
  const user = useSelector((state) => state.user);

  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const setOldPass = (text) => {
    setPassword((oldValue) => ({
      ...oldValue,
      oldPass: text,
    }));
  };
  const setNewPass = (text) => {
    setPassword((oldValue) => ({
      ...oldValue,
      newPass: text,
    }));
  };

  const setConfirmPass = (text) => {
    setPassword((oldValue) => ({
      ...oldValue,
      confirmPass: text,
    }));
  };

  const unsuccess = (msg) => {
    Alert.alert(msg);
  };

  const success = (msg) => {
    Alert.alert(msg);
    navigation.navigate("Account");
  };
  const onChangePassword = () => {
    if (password.newPass === password.confirmPass) {
      AuthModel.changePassword(
        user[0].email,
        password.oldPass,
        password.newPass,
        success,
        unsuccess
      );
    }
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
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center",justifyContent:'center',}}>
          <View style={{ flex: 0.5,}}></View>
          <View style={styles.backgroundButton}>
            <AuthInput
              placeholder="old password"
              secureTextEntry={true}
              value={password.oldPass}
              onChangeText={(text) => setOldPass(text)}
            />
            <AuthInput
              placeholder="new password"
              secureTextEntry={true}
              value={password.newPass}
              onChangeText={(text) => setNewPass(text)}
            />
            <AuthInput
              placeholder="confirm new password"
              secureTextEntry={true}
              value={password.confirmPass}
              onChangeText={(text) => setConfirmPass(text)}
            />
            <View style={{ flex: 1,marginTop: 10,}}>
              <TouchableOpacity
                style={styles.button}
                onPress={onChangePassword}
              >
                <Text style={{ fontSize: 20 }}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          
        <View style={{ flex: 0.5, }}></View>
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
    marginTop: 0,
  },
  backgroundButton: {
    flex:1 , 
    flexDirection: "column",
    backgroundColor:'rgba(255, 255, 255, 0.1)',
    paddingTop:10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth:4,
    borderRightWidth:2,
    borderRadius:10,
  }

});
