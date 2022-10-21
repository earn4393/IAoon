import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export const Splash = (props) => {
  const navigation = props.nav;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("TabNav");
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.welcome}>
      <LinearGradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      ></LinearGradient>
      <View>
        <Text style={styles.welcomeText}>ไออุ่น</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "900",
    color: "#FAA307",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // fontFamily: "Trirong",
  },
});
