import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase";
const BottomTab = ({ navigation, retrivePosts, profilePic }) => {
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out ");
      })
      .catch((error) => {
        // An error happened.
        console.log("signed out e arror", error);
      });
  };
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={retrivePosts}>
        <Image
          style={style.icon}
          source={{
            uri: "https://img.icons8.com/windows/32/ffffff/home.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={style.icon}
          source={{
            uri: "https://img.icons8.com/ios-filled/32/ffffff/search.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
        <Image
          style={style.icon}
          source={{
            uri: "https://img.icons8.com/ios/50/ffffff/add.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={signout}>
        <Image
          style={style.icon}
          source={{
            uri: "https://img.icons8.com/external-sbts2018-solid-sbts2018/58/ffffff/external-logout-social-media-sbts2018-solid-sbts2018.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          style={{ width: 30, height: 30, borderRadius: 50 }}
          source={{
            uri: profilePic,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomTab;
