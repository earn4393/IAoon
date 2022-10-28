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
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
// import { Video } from "expo-av";
// import * as ScreenOrientation from "expo-screen-orientation";
import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const VideoPlay = (props) => {
  const navigation = props.nav;
  const route = props.route;
  // console.log("in Video play", route.params.data);
  const DATA = useSelector((state) => state.watch);
  const data = route.params.data;
  const video = React.useRef(null);
  // console.log("มันคืออะไรรรร: ", navigation);

  const renderItem = ({ item }) => <ShowImages img={item.img} />;

  const ShowImages = (props) => {
    const imgTo = { uri: props.img };
    // console.log(imgTo);
    return (
      <View style={{ flex: 1 }}>
        <Image source={imgTo} style={styles.imageHead}></Image>
      </View>
    );
  };

  let watches = [];
  const youAsloLike = [];
  DATA.map((item) => {
    if (item.type == data.type && item.id != data.id) {
      watches.push(item);
    }
  });

  const ShowDetail = (props) => {
    const data = props.data;
    // const data = props;
    const imgTo = { uri: data.img };
    // console.log(imgTo);
    const [like, setLike] = useState(false);

    const categories = data.category.map((cat) => {
      return (
        <View>
          <Text style={{ fontSize: 10, color: "white" }}>{cat}</Text>
        </View>
      );
    });

    const addFavorite = (like) => {
      // console.log("CARD + USER ON CLICK", card, user);
      // props.updateUser(card, user);
      setLike(!like);
    };

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingLeft: 14,
            paddingBottom: 10,
          }}
        >
          <Image source={imgTo} style={styles.imageHead}></Image>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {data.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  paddingRight: 14,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    addFavorite(like);
                  }}
                >
                  {like ? (
                    <AntDesign color={"red"} size={24} name="heart"></AntDesign>
                  ) : (
                    <AntDesign
                      color={"white"}
                      size={24}
                      name="hearto"
                    ></AntDesign>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {categories}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "black", width: "auto", height: 100 }}
          >
            {/* หาวิธีให้ตัวอักษรขึ้นบรรทักใหม่ */}
            <Text
              style={{
                fontSize: 10,
                color: "white",
                paddingTop: 8,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            >
              {data.review}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // function setOrientation() {
  //   if (Dimensions.get("window").height > Dimensions.get("window").width) {
  //     //Device is in portrait mode, rotate to landscape mode.
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   } else {
  //     //Device is in landscape mode, rotate to portrait mode.
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  //   }
  // }

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
          {/* <Video
            source={{
              uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            ref={video}
            resizeMode="cover"
            isLooping
            onFullscreenUpdate={setOrientation}
            useNativeControls
            style={{ width: Dimensions.get("window").width, height: 200 }}
          /> */}
          <YoutubePlayer height={300} play={false} videoId={"6FWpO12Rr_I"} />
          <ScrollView style={styles.box}>
            <View>
              <ShowDetail data={data} />
            </View>
            <View>
              {/* <FlatListTester watches={DATA} watch={data} /> */}
              <View>
                <View>
                  <Text>You also like</Text>
                </View>
                {/* <FlatList
                  data={watches}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                /> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
    //   backgroundColor: "white",
    //   borderWidth: 2,
    flex: 1,
    paddingTop: 19,
    //   margin: 20,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: "100%",
  },
  imageHead: {
    width: parseInt(WIDTH / 3),
    height: parseInt(HEIGHT / 5),
    marginRight: 10,
  },
});
