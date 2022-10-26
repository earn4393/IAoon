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

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

// const Item = ({ title }) => (
//   <View style={styles.itemlist}>
//     <Text style={styles.box}>{title}</Text>
//   </View>
// );

// const ShowImages = (props) => {
//   const navigation = props.nav;
//   const imgTo = { uri: props.img };
//   // console.log(imgTo);
//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate("PlayTabNav")
//           console.log("Go to Watch Video");
//       }}
//       >
//       <Image source={imgTo} style={styles.imageHead}></Image>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // const ShowMeYourDiv = (props) => {
// //   return(
// //     <View>
// //       <Text>Test</Text>
// //     </View>
// //   )
// // }

// const FlalitHeader = (props) => {
//   return (
//     <View style={styles.countryBar}>
//       <Text style={{ fontSize: 24 }}>{props.conutry}</Text>
//     </View>
//   );
// };

// const FlatListTester = (props) => {
//   const showAllWatch = props.countryList.map((c) => {
//     let watches = [];
//     let countries = [];
//     props.data.map((item) => {
//       if (item.conutry == c) {
//         watches.push(item);
//         countries.push(item.conutry);
//       }
//     });

//     if (watches.length > 0) {
//       return (
//         <View style={{ paddingBottom: 10 }}>
//           <View style={styles.countryBar}>
//             <Text>{countries[0]}</Text>
//           </View>
//           <FlatList
//             data={watches}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             horizontal={true}
//           />
//         </View>
//       );
//     }
//   });
//   return <View>{showAllWatch}</View>;
// };

// const FlatlistFavorite = (props) => {
//   if (props.user.length > 0) {
//     const user = props.user[0].username;
//     const watches = [];

//     const showFavorite = props.data.map((item) => {
//       const index = item.love.indexOf(user);
//       if (index != -1) {
//         watches.push(item);
//       }
//     });
//     if (watches.length > 0) {
//       return (
//         <View style={{ paddingBottom: 10 }}>
//           <View style={styles.countryBar}>
//             <Text style={styles.T}>Favorite</Text>
//           </View>
//           <FlatList
//             data={watches}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             horizontal={true}
//           />
//         </View>
//       );
//     }
//   }
// };

// const renderInsideItem = ({ item }) => <FlatListTester title={item.name} />;
// const renderIMG = ({ item }) => <ShowImages img={item} />;
// const renderItem = ({ item }) => <ShowImages img={item.img} />;

export const Home = (props) => {
  const navigation = props.nav;
  const USER = useSelector((state) => state.user);
  const DATA = useSelector((state) => state.watch);
  const COUNTRY_OBJ = useSelector((state) => state.field);
  const COUNTRY_ARRAY = COUNTRY_OBJ[0].country;

  const IMG = DATA.map((item) => {
    return item.img;
  });
  const Item = ({ title }) => (
    <View style={styles.itemlist}>
      <Text style={styles.box}>{title}</Text>
    </View>
  );
  
  const ShowImages = (props) => {
    // const navigation = props.nav;
    const imgTo = { uri: props.img };
    // console.log(imgTo);
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlayTabNav")
            console.log("Go to Watch Video");
        }}
        >
          <Image source={imgTo} style={styles.imageHead}></Image>
        </TouchableOpacity>
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
  
  const FlalitHeader = (props) => {
    return (
      <View style={styles.countryBar}>
        <Text style={{ fontSize: 24 }}>{props.conutry}</Text>
      </View>
    );
  };
  
  const FlatListTester = (props) => {
    const showAllWatch = props.countryList.map((c) => {
      let watches = [];
      let countries = [];
      props.data.map((item) => {
        if (item.conutry == c) {
          watches.push(item);
          countries.push(item.conutry);
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
  
  const renderInsideItem = ({ item }) => <FlatListTester title={item.name} />;
  const renderIMG = ({ item }) => <ShowImages img={item} />;
  const renderItem = ({ item }) => <ShowImages img={item.img} />;

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
