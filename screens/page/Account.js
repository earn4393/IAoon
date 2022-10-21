import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export const Account = (props) => {
  const navigation = props.nav;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#191919", "#006262"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
        style={styles.background}
      ></LinearGradient>
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
});
