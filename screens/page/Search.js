import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

const Item = ({ title }) => (
  <View>
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

const renderItem = ({ item }) => <ShowImages img={item.img} />;

export const Search = (props) => {
  const navigation = props.nav;
  const DATA = useSelector((state) => state.watch);
  const FIELD_OBJ = useSelector((state) => state.field);
  const COUNTRY_ARRAY = FIELD_OBJ[0].country;
  const TYPE_ARRAY = FIELD_OBJ[0].type;
  const CATEGORY_ARRAY = FIELD_OBJ[0].category;

  const [conutry, setCountry] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [pushCountry, setPushCountry] = useState(1);
  const [pushType, setPushType] = useState(1);
  const [pushCategory, setPushCategory] = useState(1);
  const [Search, setSearch] = useState([{ data: [] }]);

  let data = [];
  console.log(`country: ${conutry} type: ${type} category: ${category}`);
  DATA.map((item) => {
    const index = item.category.indexOf(category);
    if (conutry !== "" && type === "" && category === "") {
      if (item.conutry == conutry) {
        data.push(item);
      }
    } else if (conutry === "" && type !== "" && category === "") {
      if (item.type === type) {
        data.push(item);
      }
    } else if (conutry === "" && type === "" && category !== "") {
      if (index !== -1) {
        data.push(item);
      }
    } else if (conutry !== "" && type !== "" && category === "") {
      if (item.conutry === conutry && item.type === type) {
        data.push(item);
      }
    } else if (conutry !== "" && type === "" && category !== "") {
      if (item.conutry === conutry && index !== -1) {
        data.push(item);
      }
    } else if (conutry === "" && type !== "" && category !== "") {
      if (index !== -1 && item.type === type) {
        data.push(item);
      }
    } else if (
      conutry !== "" &&
      type !== "" &&
      category !== "" &&
      type !== ""
    ) {
      if (item.conutry === conutry && index !== -1 && item.type === type) {
        data.push(item);
      }
    }
  });

  const SearchCountry = (props) => {
    const selectedCountry = COUNTRY_ARRAY.map((item) => {
      return (
        <View >
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
            <Text style={styles.styleText}>{item}</Text></View>
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

  const SearchType = (props) => {
    const selectedType = TYPE_ARRAY.map((item) => {
      return (
        <TouchableOpacity
          onPress={() => {
            if (type != item) {
              setType(item);
            } else {
              setType("");
            }
            console.log(type);
          }}
        >
          <Text style={styles.styleText}>{item}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View>
        <Text style={styles.styleText}>ประเภท: </Text>
        {selectedType}
      </View>
    );
  };

  const SearchCategory = (props) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      >
        <SearchCountry />
        <SearchType />
        <SearchCategory />

        <FlatList
          data={data}
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
