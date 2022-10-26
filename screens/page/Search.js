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
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const ShowImages = (props) => {
  const imgTo = { uri: props.img };
  return (
    <View style={{ flex: 1 }}>
      <Image source={imgTo} style={styles.imageHead}></Image>
    </View>
  );
};

const renderItem = ({ item }) => <ShowImages img={item.img} />;

export const Search = (props) => {
  const navigation = props.nav;
  const DATA = useSelector((state) => state.watch);
  const FIELD_OBJ = useSelector((state) => state.field);
  const COUNTRY_ARRAY = FIELD_OBJ[0].country;
  const TYPE_ARRAY = FIELD_OBJ[0].type;
  const CATEGORY_ARRAY = FIELD_OBJ[0].category;

  const [searchQry, setSearchQry] = useState(null);
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState([]);

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
    const selectedCountry = COUNTRY_ARRAY.map((item) => {
      return (
        <View>
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
            <View>
              <Text style={styles.styleText}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
    return (
      <View>
        <Text style={styles.styleText}>ประเทศ: </Text>
        {selectedCountry}
      </View>
    );
  };

  const SearchType = () => {
    return (
      <View>
        <Text style={styles.styleText}>ประเภท: </Text>
        <TouchableOpacity
          onPress={() => {
            if (type != "ภาพยนตร์") {
              setType("ภาพยนตร์");
            } else {
              setType("");
            }
            setSearch([]);
          }}
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
    const selectedCategory = CATEGORY_ARRAY.map((item) => {
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
      <View>
        <Text style={styles.styleText}>แนว: </Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      >
        <View>
          <Searchbar
            placeholder={"search from name"}
            value={searchQry}
            onChangeText={setSearchQry}
            onSubmitEditing={doSearch}
          />
        </View>
        <SearchCountry />
        <SearchType />
        <SearchCategory />

        <FlatList
          data={search}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
  styleText: {
    color: "white",
  },
  imageHead: {
    width: parseInt(WIDTH),
    height: 250,
    marginBottom: 20,
  },
});
