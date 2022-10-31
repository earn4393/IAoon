import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

export const Search = (props) => {
  const navigation = props.nav;
  const DATA = useSelector((state) => state.watch);

  const [searchQry, setSearchQry] = useState(null);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState([]);

  let countryList = [];
  let categoryList = [];
  const field = DATA.map((item) => {
    if (countryList.indexOf(item.country) == -1) {
      countryList.push(item.country);
    }

    const categories = item.category.map((cat) => {
      if (categoryList.indexOf(cat) == -1) {
        categoryList.push(cat);
      }
    });
  });

  console.log(`country: ${country} type: ${type} category: ${category}`);
  DATA.map((item) => {
    const index = item.category.indexOf(category);
    if (country !== "" && type === "" && category === "") {
      if (item.country == country) {
        search.push(item);
      }
    } else if (country === "" && type !== "" && category === "") {
      if (item.type === type) {
        search.push(item);
      }
    } else if (country === "" && type === "" && category !== "") {
      if (index !== -1) {
        search.push(item);
      }
    } else if (country !== "" && type !== "" && category === "") {
      if (item.country === country && item.type === type) {
        search.push(item);
      }
    } else if (country !== "" && type === "" && category !== "") {
      if (item.country === country && index !== -1) {
        search.push(item);
      }
    } else if (country === "" && type !== "" && category !== "") {
      if (index !== -1 && item.type === type) {
        search.push(item);
      }
    } else if (
      country !== "" &&
      type !== "" &&
      category !== "" &&
      type !== ""
    ) {
      if (item.country === country && index !== -1 && item.type === type) {
        search.push(item);
      }
    }
  });

  const SearchCountry = () => {
    const selectedCountry = countryList.map((item) => {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              if (country != item) {
                setCountry(item);
              } else {
                setCountry("");
              }
              setSearch([]);
            }}
          >
            <Text style={styles.styleText}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View style={styles.fieldbar}>
        <Text style={styles.styleText}>ประเทศ :</Text>
        {selectedCountry}
      </View>
    );
  };

  const SearchType = () => {
    return (
      <View style={styles.fieldbar}>
        <Text style={styles.styleText}>ประเภท :</Text>
        <TouchableOpacity
          onPress={() => {
            if (type != "ภาพยนตร์") {
              setType("ภาพยนตร์");
            } else {
              setType("");
            }
            setSearch([]);
          }}
          style={{ flexDirection: "row" }}
        >
          <Text style={styles.styleText}>ภาพยนตร์</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (type != "ซีรี่ย์") {
              setType("ซีรี่ย์");
            } else {
              setType("");
            }
            setSearch([]);
          }}
        >
          <Text style={styles.styleText}>ซีรี่ย์</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SearchCategory = () => {
    const selectedCategory = categoryList.map((item) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (category != item) {
              setCategory(item);
            } else {
              setCategory("");
            }
            setSearch([]);
          }}
        >
          <Text style={styles.styleText}>{item}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.fieldbar}>
        <Text style={styles.styleText}>แนว :</Text>
        {selectedCategory}
      </View>
    );
  };

  const doSearch = () => {
    if (searchQry !== null || searchQry !== "") {
      let index = DATA.findIndex((item) => item.name.includes(searchQry));
      if (index != -1) {
        setSearch([DATA[index]]);
      }
    }
  };

  const ShowImages = (props) => {
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
          <Image source={imgTo} style={styles.imagetitle}></Image>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => <ShowImages data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            width: parseInt(WIDTH),
            height: parseInt(HEIGHT * 0.1),
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: parseInt(HEIGHT * 0.05),
              backgroundColor: "black",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                console.log("Go Home");
              }}
              style={{
                flex: 1,
                borderWidth: 2,
              }}
            >
              <Entypo
                name="chevron-small-left"
                size={32}
                color="#006262"
                style={{ position: "absolute", top: 5, right: 3 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 4 }}>
              <Text
                style={{
                  fontSize: 25,
                  color: "#FAA307",
                  flex: 3,
                  marginLeft: -5,
                }}
              >
                ไออุ่น
              </Text>
            </View>

            <View style={{ flex: 10 }}>
              <Searchbar
                placeholder={"search from name"}
                placeholderTextColor="black"
                value={searchQry}
                onChangeText={setSearchQry}
                onSubmitEditing={doSearch}
                style={styles.searchbarStyle}
                inputStyle={{ color: "black" }}
              />
            </View>
          </View>
          <SearchCountry />
          <SearchType />
          <SearchCategory />
          <View style={{ flex: 10 }}>
            <FlatList
              data={search}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "column",
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
  styleText: {
    color: "white",
    margin: 5,
  },
  imagetitle: {
    width: parseInt(WIDTH / 2),
    height: 250,
    margin: 5,
  },
  searchbarStyle: {
    backgroundColor: "gray",
    height: parseInt(HEIGHT * 0.05),
    width: parseInt(WIDTH * 0.7),
    alignItems: "flex-end",
    textColor: "pink",
    marginLeft: -25,
  },
  fieldbar: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
});
