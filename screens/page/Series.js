import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import Slideshow from "react-native-image-slider-show";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const ShowImage = (props) => {
  const navigation = props.nav;
  const imgTo = { uri: props.data.img };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate({
            name: "PlayTabNav",
            params: props.data,
          });
          console.log("Go to Watch Video");
        }}
      >
        <View style={{ paddingLeft: 5, paddingTop: 10, paddingRight: 5 }}>
          <Image source={imgTo} style={styles.imagetitle}></Image>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              paddingRight: 8,
              paddingTop: 4,
              marginBottom: 0,
              marginTop: 0,
              width: parseInt(WIDTH / 2),
              height: "auto",
              // backgroundColor:'pink',
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

const renderItem = ({ item }) => {
  return <ShowImage data={item.data} nav={item.nav} />;
};

const FlatListTester = (props) => {
  const navigation = props.nav;
  const showAllWatch = props.country_array.map((c) => {
    let watches = [];
    let countries = [];
    props.data.map((item) => {
      if (item.country == c.country && item.type == "ซีรี่ย์") {
        watches.push({ data: item, nav: navigation });
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

export const Series = (props) => {
  const navigation = props.nav;
  const DATA = useSelector((state) => state.watch);
  const COUNTRY_ARRAY = useSelector((state) => state.field);
  const [position, setPosition] = useState(0);
  const dataSource = [];
  const movies = [];

  DATA.map((item) => {
    if (dataSource.length < 6) {
      if (item.type == "ซีรี่ย์") {
        dataSource.push({ url: item.img });
        movies.push(item);
      }
    }
  });

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length ? 0 : position + 1);
    }, 2000);
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
        <ScrollView style={styles.box}>
          <View style={{ paddingBottom: 10 }}>
            <Slideshow
              dataSource={dataSource}
              position={position}
              onPositionChanged={(position) => setPosition(position)}
              indicatorSize={20}
              height={250}
              onPress={({ url, index }) => {
                console.log("index: ", index);
                console.log("data: ", movies[index]);
                navigation.navigate({
                  name: "PlayTabNav",
                  params: movies[index],
                });
              }}
            />
          </View>
          <FlatListTester
            data={DATA}
            country_array={COUNTRY_ARRAY}
            nav={navigation}
          />
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
  imagetitle: {
    width: parseInt(WIDTH / 2),
    height: 250,
    // marginBottom: 10,
  },
  countryBar: {
    backgroundColor: "#FAA307",
    width: "100%",
    height: "auto",
    paddingLeft: 8,
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
