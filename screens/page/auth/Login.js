import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const TopIMG = { uri: 'https://i.ibb.co/mXW1Fmf/unknown-1.png' }

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
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      sex: doc.data().sex,
      img: doc.data().img,
    };
    dispatch(addUser(profile_state));
    navigation.navigate("Account");
  };

  const unsuccess = (msg) => {
    Alert.alert(msg);
  };

  const signInSucces = (email) => {
    console.log("sign in succes email = ", email);
    userModel.getUserByUsername(email, success, unsuccess);
  };

  const onSignInPress = () => {
    AuthModel.signInEmailPass(
      credential.email,
      credential.password,
      signInSucces,
      unsuccess
    );
  };

  // สำหรับไปหน้า Register
  const onSignUpPress = () => {
    navigation.navigate("Register");
  };

  // สำหรับไปหน้าลืมรหัส
  const onForgotPress = () => {
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


        <View style={{ flex: 1 , flexDirection: "column" ,justifyContent:'center',alignItems: 'stretch',}}>
          <View style={{ flex: 2,alignItems: "center",}}>
            <Image
              style={{width:parseInt(WIDTH) , height:parseInt(HEIGHT/4)}}
              source={TopIMG}>
            </Image>
          </View>
          {/* <View style={{ flex: 1,}}> */}

        {/* <View style={{ flex: 1 }}> */}
          <View style={{ flex: 1 }}>
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
          </View>

          <View style={{ flex: 2 ,alignItems:'center',marginTop:10,}}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSignInPress}
            >
              <Text style={{ fontSize: 20 ,color: '#000'}}>Sign in</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.button}
              onPress={onSignUpPress}
            >
              <Text style={{ fontSize: 20,color: '#000' }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onForgotPress} 
              style={{alignSelf:'flex-end',paddingRight:16}}
              >
              <Text
                style={{
                  fontSize: 16,
                  color: "#9AD3DA",
                  textDecorationColor: "#9AD3DA",
                  textDecorationLine: "underline",
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          

        {/* </View> */}

        </View>
        {/* <View style={{ flex: 0.5 }}></View> */}

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
});
