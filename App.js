import React, { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import AuthNavigation from "./AuthNavigation";
import { WebView } from "react-native-webview";
import Ticktok from "./Screens/Ticktok";
export default function App() {
  console.disableYellowBox = true;
  const url =
    "https://open-api.tiktok.com/platform/oauth/connect/?client_key=CLIENT_KEY&scope=user.info.basic&response_type=code&redirect_uri=https://github.com/&state=20";
  return (
    <SafeAreaView style={style.container}>
      <AuthNavigation />
      {/* <Ticktok /> */}
      {/* <WebView source={{ uri: "https://todo-list-bipul.herokuapp.com/" }} /> */}
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
