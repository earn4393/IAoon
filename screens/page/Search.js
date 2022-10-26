import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";

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
  const [conutry, setCountry] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState([]);

  console.log(`country: ${conutry} type: ${type} category: ${category}`);
  DATA.map((item) => {
    const index = item.category.indexOf(category);
    if (conutry !== "" && type === "" && category === "") {
      if (item.conutry == conutry) {
        search.push(item);
      }
    } else if (conutry === "" && type !== "" && category === "") {
      if (item.type === type) {
        search.push(item);
      }
    } else if (conutry === "" && type === "" && category !== "") {
      if (index !== -1) {
        search.push(item);
      }
    } else if (conutry !== "" && type !== "" && category === "") {
      if (item.conutry === conutry && item.type === type) {
        search.push(item);
      }
    } else if (conutry !== "" && type === "" && category !== "") {
      if (item.conutry === conutry && index !== -1) {
        search.push(item);
      }
    } else if (conutry === "" && type !== "" && category !== "") {
      if (index !== -1 && item.type === type) {
        search.push(item);
      }
    } else if (
      conutry !== "" &&
      type !== "" &&
      category !== "" &&
      type !== ""
    ) {
      if (item.conutry === conutry && index !== -1 && item.type === type) {
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
              if (conutry != item) {
                setCountry(item);
              } else {
                setCountry("");
              }
              console.log(conutry);
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
    const selectedType = TYPE_ARRAY.map((item) => {
      return (
        // <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            if (type != item) {
              setType(item);
            } else {
              setType("");
            }
            console.log(type);
          }}
          style={{ flexDirection: "row" }}
        >
          <Text style={styles.styleText}>{item}</Text>
        </TouchableOpacity>
        // </View>
      );
    });
    return (
      <View>
        <Text style={styles.styleText}>ประเภท: </Text>
        {selectedType}
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
            console.log(category);
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
    width: 500,
    height: 250,
    marginBottom: 20,
  },
});
