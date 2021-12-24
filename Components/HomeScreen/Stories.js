import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Stories = ({ profilePic, username }) => {
  const [dummyData, setDummyData] = useState([1, 2, 3, 4, 5, 6, 7]);
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={style.image}
            source={{
              uri: profilePic,
            }}
          />
          <Text style={{ color: "white" }}>{username}</Text>
        </View>
        {dummyData.map((data, index) => {
          return (
            <View key={index} style={{ alignItems: "center" }}>
              <Image
                style={style.image}
                source={{
                  uri:
                    "https://source.unsplash.com/random/200x200?sig=" +
                    Math.round(Math.random() * 10 + 1),
                }}
              />
              <Text style={{ color: "white" }}>Lorem</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
export default Stories;
