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
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import Slideshow from "react-native-image-slider-show";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Home = (props) => {
  const navigation = props.nav;
  const USER = useSelector((state) => state.user);
  const DATA = useSelector((state) => state.watch);
  const COUNTRY_ARRAY = useSelector((state) => state.field);
  const [user, setUser] = useState(USER[0].username);
  console.log("home : ", USER);

  const IMG = DATA.map((item) => {
    return item;
  });

  const ShowImages = (props) => {
    // console.log(props)
    // const getAllWatches = []
    // for (var i=0; i < 5; i++){
    //   getAllWatches.push()
    // }
    const imgTo = { uri: props.data.img };
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("PlayTabNav", {
            //   data: { text: "Hello" },
            // });
            navigation.navigate({
              name: "PlayTabNav",
              params: props.data,
            });
            console.log("Go to Watch Video");
          }}
        >
          <Image source={imgTo} style={styles.imageHead}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const ShowImage = (props) => {
    // const navigation = props.nav;
    const imgTo = { uri: props.data.img };
    const title = props.title;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("PlayTabNav", {
            //   data: { text: "Hello" },
            // });
            navigation.navigate({
              name: "PlayTabNav",
              params: props.data,
            });
            console.log("Go to Watch Video");
          }}
        >
          <View style={{ paddingLeft: 10, paddingTop: 10 }}>
            <Image source={imgTo} style={styles.imagetitle}></Image>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                paddingRight: 4,
                marginBottom: 0,
                marginTop: -30,
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>
                {props.data.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const FlatListTester = (props) => {
    const showAllWatch = props.countryList.map((c) => {
      let watches = [];
      let countries = [];
      props.data.map((item) => {
        if (item.country == c.country) {
          watches.push(item);
          countries.push(item.country);
        }
      });

      if (watches.length > 0) {
        return (
          <View style={{ paddingBottom: 10 }}>
            <View style={styles.countryBar}>
              <Text>{countries[0]}</Text>
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
    });
    return <View>{showAllWatch}</View>;
  };

  const FlatlistFavorite = (props) => {
    if (props.user.length > 0) {
      const user = props.user[0].username;
      const watches = [];

      const showFavorite = props.data.map((item) => {
        const index = item.love.indexOf(user);
        if (index != -1) {
          watches.push(item);
        }
      });
      if (watches.length > 0) {
        return (
          <View style={{ paddingBottom: 10 }}>
            <View style={styles.countryBar}>
              <Text style={styles.T}>Favorite</Text>
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
    }
  };

  const renderIMG = ({ item }) => <ShowImages data={item} />;
  const renderItem = ({ item }) => <ShowImage data={item} />;

  const [position, setPosition] = useState(0);
  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === 5 ? 0 : position + 1);
    }, 3000);

    return () => clearInterval(toggle);
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      >
        {/* <Slideshow
          position={position} 
          dataSource={IMG}
        /> */}

        <ScrollView style={styles.box}>
          <FlatList
            data={IMG}
            renderItem={renderIMG}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
          <FlatlistFavorite data={DATA} user={USER} />
          <FlatListTester data={DATA} countryList={COUNTRY_ARRAY} />
        </ScrollView>
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
