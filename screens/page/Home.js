import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const DATA = [
  {
    id: "1",
    name: "Appocite",
    review: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "A",
    conutry: "A",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "C"],
  },
  {
    id: "2",
    name: "Apple",
    review: "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    type: "A",
    conutry: "A",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "C"],
  },
  {
    id: "3",
    name: "Beep",
    review: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    type: "B",
    conutry: "B",
    abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: ["A", "B", "D"],
  },
  {
    id: "4",
    name: "Coral",
    review: "ccccccccccccccccccccccccccccccccccc",
    type: "A",
    conutry: "C",
    abstract: "aaaaaaaaaaaaaaaaadddertergeaaaaaaaaaaaaaaaaaa",
    category: ["A", "C", "D"],
  },
  // {
  //   id: "4",
  //   name: "D",
  //   review: "bbbbbbbbbbbbbbbhyttttttttttttttttttttttttt",
  //   type: "B",
  //   conutry: "B",
  //   abstract: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   category: ["A", "B", "D"],
  // },
];

const IMG = [
  {
    id: 1,
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
  {
    id: 2,
    img: "https://i.ibb.co/bFH0XSc/ShoesVeg.jpg",
  },
  {
    id: 3,
    img: "https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg",
  },
];

const c = ["A", "B", "C"];

const Item = ({ title }) => (
  <View style={styles.itemlist}>
    <Text style={styles.box}>{title}</Text>
  </View>
);

const ShowImages = (props) => {
  const imgTo = { uri: props.img };
  // console.log(imgTo);
  return (
    <View style={{ flex: 1 }}>
      <Image source={imgTo} style={styles.imageHead}></Image>
    </View>
  );
};

// const ShowMeYourDiv = (props) => {
//   return(
//     <View>
//       <Text>Test</Text>
//     </View>
//   )
// }

// const FlalitHeader = (props) => {
//   return (
//     <View style={styles.countryBar}>
//       <Text style={{fontSize:24}}>{props.conutry}</Text>
//     </View>
//   );
// };

const renderItem = ({ item }) => <Item title={item.name} />;

const FlatListTester = (props) => {
  const a = c.map((c) => {
    let b = [];
    let country = [];
    DATA.map((item) => {
      if (item.conutry == c) {
        b.push(item);
        country.push(item.conutry);
      }
      // console.log(item)
    });

    return (
      <View style={{ paddingBottom: 10 }}>
        <View style={styles.countryBar}>
          <Text>{country[0]}</Text>
        </View>
        <FlatList
          data={b}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    );
  });
  return <View>{a}</View>;
};

const renderInsideItem = ({ item }) => <FlatListTester title={item.name} />;

export const Home = (props) => {
  const navigation = props.nav;

  const renderItem = ({ item }) => <Item title={item.name} />;

  const renderIMG = ({ item }) => <ShowImages img={item.img} />;

  // const a = c.map((c) => {
  //   let b = [];
  //   // let country =[]
  //   // let c = []
  //   DATA.map((item) => {
  //     if (item.conutry == c) {
  //       b.push(item);
  //       // country.push(item.conutry)
  //     }
  //   });
  //   // console.log("Stop Shut up", country[0])
  //   return (
  //     <View>
  //       <Text>A</Text>
  //     <FlatList
  //       data={b}
  //       renderItem={renderItem}
  //       keyExtractor={(item) => item.id}

  //       ListHeaderComponent={<FlalitHeader conutry={c} />}
  //     />
  //     </View>
  //   );
  // });

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
          {/* {a} */}
          {/* <FlatList
           data={c}
           renderItem={renderInsideItem}
           keyExtractor={(item) => item.country}/> */}
          <FlatListTester />
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
    marginBottom: 20,
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
