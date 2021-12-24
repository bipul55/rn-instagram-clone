import React, { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import AuthNavigation from "./AuthNavigation";
export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <AuthNavigation />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: StatusBar.currentHeight,
  },
});
