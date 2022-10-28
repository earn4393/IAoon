import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import regStyles from "../styles/authStyle";
import AuthInput from "./AuthInput";

export const ChangePassword = (props) => {
  const navigation = props.navigation;

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
    console.log(msg);
    Alert.alert(msg);
  };

  const success = (msg) => {
    Alert.alert(msg);
  };
  const onChangePassword = () => {
    console.log("Change password now");
    success("Change password successfully");
  };
  return (
    <SafeAreaView style={regStyles.container}>
      <View style={{ flex: 1 }}></View>
      <View style={[{ flex: 3 }, regStyles.inputContainer]}>
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
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            borderRadius: 40,
            marginVertical: 20,
          }}
          onPress={onChangePassword}
        >
          <Text style={{ fontSize: 20 }}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2 }}></View>
    </SafeAreaView>
  );
};
