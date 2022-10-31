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
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Register = (props) => {
  const navigation = props.nav;
  const user = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState("");
  const selectSex = ["female", "male"];
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    sex: "",
    img: "https://i.ibb.co/y4n8n20/user.jpg",
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

  const setImage = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      img: text,
    }));
  };
  // แจ้งเตือนแล้วไป
  const allSuccess = (doc) => {
    Alert.alert(`${doc.username} has been added to system`);
    navigation.navigate("Account");
  };

  const unsuccess = (msg) => {
    Alert.alert(msg);
  };

  const loadToFirebase = () => {
    userModel.addUser(profile, allSuccess);
  };

  const onRegisterPress = () => {
    AuthModel.signUpEmailPass(
      profile.email,
      password,
      loadToFirebase,
      unsuccess
    );
  };

  // กลับไปหน้า login
  const onCancelPress = () => {
    console.log("จะออกจาก register");
    navigation.navigate("Account");
  };

  // สำหรับใส่รูปภาพของ
  let openImagePickerAsync = async () => {
    let perm = await ImagePicker.requestCameraPermissionsAsync();
    console.log("Add picture on Account page");
    if (perm === false) {
      Alert("Allow access to your files.");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setImage(pickerResult.uri);
    Alert.alert("Select your image already");
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
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 24,
            }}
          >
            <View style={{ height: 100, width: 100 }}>
              <TouchableOpacity onPress={openImagePickerAsync}>
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                  source={{ uri: profile.img }}
                ></Image>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, color: "#9AD3DA", paddingTop: 10 }}>
              รูปโปรไฟล์
            </Text>
          </View>
          <View
            style={{ flex: 5, flexDirection: "column", alignItems: "stretch" }}
          >
            <AuthInput
              placeholder="Email"
              secureTextEntry={false}
              value={profile.email}
              onChangeText={(text) => setEmail(text)}
            />
            <AuthInput
              placeholder="Password"
              secureTextEntry={false}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <AuthInput
              placeholder="Username"
              secureTextEntry={false}
              value={profile.username}
              onChangeText={(text) => setUsername(text)}
            />
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
            <View style={{ alignItems: "center" }}>
              <SelectDropdown
                data={selectSex}
                defaultButtonText="Select your gender"
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
                  borderRadius: 40,
                }}
                buttonTextStyle={{ fontSize: 20, textAlign: "left" }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 2,
              borderWidth: 0,
              borderColor: "yellow",
              margin: 20,
              alignItems: "center",
            }}
          >
            <View style={{ paddingBottom: 10 }}>
              <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
                <Text style={{ fontSize: 20 }}>Register</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={onCancelPress}>
                <Text style={{ fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    width: 200,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
});
