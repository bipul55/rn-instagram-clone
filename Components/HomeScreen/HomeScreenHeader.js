import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
const HomeScreenHeader = () => {
  return (
    <View style={style.container}>
      <TouchableOpacity>
        <Image
          style={style.insta_logo}
          source={require("../../assets/insta-logo.png")}
        />
      </TouchableOpacity>
      <View style={style.iconContainer}>
        <TouchableOpacity>
          <Image
            style={style.icon}
            source={{
              uri: "https://img.icons8.com/windows/32/ffffff/like.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={style.messageNo}>11</Text>
          <Image
            style={style.icon}
            source={{
              uri: "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-comment-chat-flatart-icons-outline-flatarticons-2.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insta_logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  messageNo: {
    position: "absolute",
    color: "white",
    backgroundColor: "red",
    right: 2,
    padding: 2,
    fontWeight: "700",
    borderRadius: 50,
    zIndex: 100,
  },
});

export default HomeScreenHeader;
