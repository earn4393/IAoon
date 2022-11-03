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

  const categories = watch.category.map((cat) => {
    return (
      <View>
        <Text style={{ fontSize: 16, color: "white" }}>{cat}</Text>
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
          <View style={{ margin:8,padding: 5,backgroundColor: '#FAA307',width: '30%' ,borderRadius:10,}}>
            <Text style={{ fontSize:16,alignSelf:'center'}}>You also like:</Text>
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
      <View style={{ flex: 1 ,margin:4,paddingLeft:12}}>
        <ScrollView>
        <TouchableOpacity
          onPress={() => {
            setPlay(props.data);
          }}
          style={styles.serieStyle}
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
        </ScrollView>
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
        {/* <View style={styles.container}> */}
          {/* <View style={{flex: 4,}}>
            <YoutubePlayer height={300} play={false} videoId={play} />
          </View> */}
          
          
            {watch.type != "ภาพยนตร์" ? (
              <View style={{ flex: 5}}>
                <View style={{flex: 4,}}>
                  <YoutubePlayer height={300} play={false} videoId={play} />
                </View>
                <View style={{flex: 1}}>
                  <FlatList
                    data={watch.ep}
                    renderItem={renderPlay}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </View>
              </View>
            ) : 
              <View style={{flex: 3.25,}}>
                <YoutubePlayer height={300} play={false} videoId={play} />
              </View>
            }
         
          <View style={{flex: 7}}>
          <ScrollView style={styles.box}>
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
                    <View style={{ flex: 2, flexDirection: "row" }}>
                      <View style={{ flex: 1,width:100,height:100,}}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {watch.name}
                      </Text>
                      </View>

                      <View
                        style={{
                          flex: 0.25,
                          alignItems: "center",
                          paddingRight: '4%',
                          paddingTop: '2%',
                          // backgroundColor:'yellow',
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
                </View>
                <View
                  style={{
                    backgroundColor: "black",
                    width: "auto",
                    height: "auto",
                    // height:100,
                    flex: 1,
                    flexDirection: 'column',
                    marginHorizontal: 16,
                    padding: 12,
                    borderRadius:10,
                  }}
                >
                  {/* หาวิธีให้ตัวอักษรขึ้นบรรทัดใหม่ */}
                  {/* <ScrollView style={{
                    backgroundColor: "black",
                    width: "auto",
                    // height: "auto",
                    height:100,
                    marginHorizontal: 16,
                    padding: 12,
                    borderRadius:10,
                  }}> */}
                    <Text style={{color: "#9AD3DA"}}>
                      เรื่องย่อ: {watch.review}
                    </Text>
                  {/* </ScrollView> */}
                    </View>
                {/* </SafeAreaView> */}
                {/* </ScrollView> */}
                
            <ScrollView style={styles.box2}>
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
    paddingTop: 12,
  },
  box2: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 8,
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
  serieStyle: {
    height:50,
    width:50,
    backgroundColor:'#006262',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
  }
});
