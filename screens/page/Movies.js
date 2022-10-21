import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const DATA = [
  {
    id: "1",
    name: "A",
    review: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "A",
    conutry: "A",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "C"],
  },
  {
    id: "2",
    name: "B",
    review: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    type: "B",
    conutry: "B",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "D"],
  },
  {
    id: "3",
    name: "C",
    review: "ccccccccccccccccccccccccccccccccccc",
    type: "A",
    conutry: "B",
    abstract: "aaaaaaaaaaaaaaaaadddertergeaaaaaaaaaaaaaaaaaa",
    category: ["A", "C", "D"],
  },
  {
    id: "3",
    name: "frde",
    review: "bbbbbbbbbbbbbbbhyttttttttttttttttttttttttt",
    type: "B",
    conutry: "B",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "D"],
  },
];

const IMG = [
  {
    id: 1,
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
  {
    id: 2,
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
  {
    id: 3,
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
];

const c = ["A", "B"];
const Item = ({ title }) => (
  <View>
    <Text style={styles.box}>{title}</Text>
  </View>
);

const ShowImages = (props) => {
  const imgTo = { uri: props.img };
  console.log(imgTo);
  return (
    <View>
      <Image source={imgTo} style={{ width: 500, height: 500 }}></Image>
    </View>
  );
};

const FlalitHeader = (props) => {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Text>{props.conutry}</Text>
    </View>
  );
};

export const Movies = (props) => {
  const navigation = props.nav;

  const renderItem = ({ item }) => <Item title={item.name} />;

  const renderIMG = ({ item }) => <ShowImages img={item.img} />;

  const a = c.map((c) => {
    let b = [];
    DATA.map((item) => {
      if (item.conutry == c) {
        if (item.type == "A") {
          b.push(item);
        }
      }
    });

    if (b.length > 0) {
      return (
        <FlatList
          data={b}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          ListHeaderComponent={<FlalitHeader conutry={c} />}
        />
      );
    }
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
          <FlatList
            data={IMG}
            renderItem={renderIMG}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
          {a}
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
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageHead: {
    width: 500,
    height: 250,
    marginBottom: 20,
  },
  countryBar: {
    backgroundColor: "#FAA307",
    width: "100%",
    height: 40,
  },
});
