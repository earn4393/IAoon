import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const ShowDetail = (props) => {
    const data = props.data;
    const imgTo = { uri: data.img };
    // console.log(imgTo);
  
    return (
      <View style={{ flex: 1 }}>
        <Image source={imgTo} style={styles.imageHead}></Image>
        <View>
          <Text>{data.name}</Text>
          <View>
            <TouchableOpacity>
              <Text>Love</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>{data.review}</Text>
      </View>
    );
  };


export const VideoPlay = (props) => {
    const navigation = props.nav;
    const video = React.useRef(null);
    const data = {
      id: "1",
      name: "สิ่งเล็กๆที่เรียกว่ารัก",
      review:
        "สิ่งเล็กๆที่เรียกว่ารักaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      type: "movies",
      conutry: "India",
      category: ["comady", "drama"],
      love: ["Earn", "Donut"],
      img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
    };
  
    function setOrientation() {
      if (Dimensions.get("window").height > Dimensions.get("window").width) {
        //Device is in portrait mode, rotate to landscape mode.
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        //Device is in landscape mode, rotate to portrait mode.
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#191919", "#006262"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.6 }}
          style={styles.background}
        >
          
          <View style={styles.container}>
            <Video
              source={{
                uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              ref={video}
              resizeMode="cover"
              isLooping
              onFullscreenUpdate={setOrientation}
              useNativeControls
              style={{ width: Dimensions.get("window").width, height: 200 }}
            />
            <ScrollView style={styles.box}>
              {/* <Text>What's happening?</Text> */}
              <ShowDetail data={data} />
            </ScrollView>
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
      // backgroundColor: 'orange',
    },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    box: {
      backgroundColor: "white",
      borderWidth: 2,
      flex: 1,
      margin: 20,
    },
    video: {
      alignSelf: "center",
      width: 320,
      height: "100%",
    },
    imageHead: {
      width: parseInt(WIDTH),
      height: 250,
      marginBottom: 20,
    },
  });
  