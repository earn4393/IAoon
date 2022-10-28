import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "./AuthInput";
import * as AuthModel from "../../../firebase/authModel";
import * as userModel from "../../../firebase/userModel";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../redux/slice/userSlice";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Register = (props) => {
  const navigation = props.nav;
  const user = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState("");
  const selectSex = ["female", "male"];
  const [password, setPassword] = useState("");
  console.log(user);

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    sex: "",
    img: "",
  });

  const setFirstname = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      firstName: text,
    }));
  };

  const setLastname = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      lastName: text,
    }));
  };

  const setEmail = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      email: text,
    }));
  };

  const setUsername = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      username: text,
    }));
  };

  const setSex = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      sex: text,
    }));
  };
  // แจ้งเตือนแล้วไป
  const allSuccess = (doc) => {
    Alert.alert(`${doc.firstname} has been added to system`);
    // navigation.goBack()
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const loadToStore = () => {
    dispatch(addUser(profile));
    allSuccess(profile);
  };

  const loadToFirebase = () => {
    userModel.addUser(profile, loadToStore);
  };

  const onRegisterPress = () => {
    // console.log(`profile ${profile.firstname}`)
    AuthModel.signUpEmailPass(
      profile.email,
      password,
      loadToFirebase,
      unsuccess
    );
  };

  // กลับไปหน้า login
  const onCancelPress = () => {
    // navigation.goBack()
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
            flex: 3,
            flexDirection: "row",
            paddingLeft: 5,
            borderWidth: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: 30,
              paddingLeft: 10,
            }}
          >
            Registration
          </Text>
        </View>
        <AuthInput
          placeholder="Firstname"
          secureTextEntry={false}
          value={profile.firstname}
          onChangeText={(text) => setFirstname(text)}
        />
        <AuthInput
          placeholder="Lastname"
          secureTextEntry={false}
          value={profile.lastname}
          onChangeText={(text) => setLastname(text)}
        />
        <AuthInput
          placeholder="Email"
          secureTextEntry={false}
          value={profile.email}
          onChangeText={(text) => setEmail(text)}
        />
        <AuthInput
          placeholder="Username"
          secureTextEntry={false}
          value={profile.username}
          onChangeText={(text) => setUsername(text)}
        />
        <AuthInput
          placeholder="Password"
          secureTextEntry={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <SelectDropdown
          data={selectSex}
          defaultButtonText={profile.sex}
          onSelect={(selectedItem, index) => {
            setSex(selectedItem);
            console.log(selectedItem, index);
          }}
          renderDropdownIcon={(focused) => {
            return (
              <Entypo
                name={focused ? "chevron-small-down" : "chevron-small-up"}
                size={32}
                color="#000000"
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={{ backgroundColor: "#9AD3DA" }}
          buttonStyle={{
            backgroundColor: "#9AD3DA",
            marginTop: 13,
            width: 350,
            borderColor: "black",
            borderWidth: 1,
          }}
          buttonTextStyle={{ fontSize: 20, textAlign: "left" }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingVertical: 5,
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
            onPress={onRegisterPress}
          >
            <Text style={{ fontSize: 20 }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 5,
            paddingBottom: 10,
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
            onPress={onCancelPress}
          >
            <Text style={{ fontSize: 20 }}>Cancel</Text>
          </TouchableOpacity>
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
