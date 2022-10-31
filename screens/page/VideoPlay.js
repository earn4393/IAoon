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
import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { updateWatch, deleteWatch } from "../../redux/slice/watchSlice";
import { useDispatch } from "react-redux";
import * as WatchModel from "../../firebase/watchModel";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const VideoPlay = (props) => {
  const navigation = props.nav;
  const route = props.route;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.watch);
  const user = useSelector((state) => state.user);

  const [watch, setWatch] = useState(route.params.data);
  const [love, setLove] = useState([...watch.love]);
  const [like, setLike] = useState(love.indexOf(username) != -1 ? true : false);
  const [play, setPlay] = useState(watch.trailer);
  const [username, setUsername] = useState(
    user.length > 0 ? user[0].username : ""
  );

  const imgTo = { uri: watch.img };

  console.log("Love : ", love);

  const categories = watch.category.map((cat) => {
    return (
      <View>
        <Text style={{ fontSize: 10, color: "white" }}>{cat}</Text>
      </View>
    );
  });

  const FlatListTester = () => {
    const watches = [];
    data.map((item) => {
      if (item.id != watch.id && item.type == watch.type) {
        watches.push(item);
      }
    });
    if (watches.length > 0) {
      return (
        <View style={{ paddingBottom: 10 }}>
          <View>
            <Text>You also like</Text>
          </View>
          <FlatList
            data={watches}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      );
    }
  };

  const renderItem = ({ item }) => <ShowImages data={item} />;
  const renderPlay = ({ item, index }) => (
    <ShowEpisode data={item} index={index} />
  );

  const ShowImages = (props) => {
    const imgTo = { uri: props.data.img };
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            setWatch(props.data);
            setPlay(props.data.trailer);
          }}
        >
          <Image source={imgTo} style={styles.imageHead}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const ShowEpisode = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            setPlay(props.data);
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
            }}
          >
            {props.index + 1}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const unLikeWatched = () => {
    dispatch(deleteWatch({ id: watch.id, username: username }));
  };

  const likeWatched = () => {
    dispatch(updateWatch({ id: watch.id, username: username }));
  };

  const addFavorite = () => {
    if (username != "") {
      let loveList;
      let array;
      if (!like) {
        loveList = [...love, username];
        array = {
          id: watch.id,
          name: watch.name,
          review: watch.review,
          type: watch.type,
          country: watch.country,
          category: watch.category,
          love: loveList,
          img: watch.img,
          trailer: watch.trailer,
        };
        WatchModel.updateWatch(array, likeWatched);
      } else {
        loveList = love.filter((item) => item != username);
        array = {
          id: watch.id,
          name: watch.name,
          review: watch.review,
          type: watch.type,
          country: watch.country,
          category: watch.category,
          love: loveList,
          img: watch.img,
          trailer: watch.trailer,
        };
        WatchModel.updateWatch(array, unLikeWatched);
      }
      setLove(loveList);
      setLike(!like);
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
        <View style={styles.container}>
          <YoutubePlayer height={300} play={false} videoId={play} />
          {watch.type != "ภาพยนตร์" ? (
            <FlatList
              data={watch.ep}
              renderItem={renderPlay}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          ) : null}
          <ScrollView style={styles.box}>
            <View>
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
                        {watch.name}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          paddingRight: 14,
                        }}
                      >
                        <TouchableOpacity onPress={addFavorite}>
                          {like ? (
                            <AntDesign
                              color={"red"}
                              size={24}
                              name="heart"
                            ></AntDesign>
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
                    style={{
                      backgroundColor: "black",
                      width: "auto",
                      height: 100,
                    }}
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
                      {watch.review}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <ScrollView style={styles.box}>
              <FlatListTester />
            </ScrollView>
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
