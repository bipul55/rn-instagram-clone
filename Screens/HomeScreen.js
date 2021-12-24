import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import BottomTab from "../Components/HomeScreen/BottomTab";
import HomeScreenHeader from "../Components/HomeScreen/HomeScreenHeader";
import Posts from "../Components/HomeScreen/Posts";
import Stories from "../Components/HomeScreen/Stories";
import { p } from "../Dummy data/dummy_posts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    var temp = [];
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc);
    });
    setPosts([...temp]);
    setLoading(false);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  useEffect(() => {
    if (posts.length < 1) {
      fetchPosts();
    }
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <HomeScreenHeader />
      <ScrollView>
        <View>
          <Stories />
          {loading ? (
            <View>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                Loading
              </Text>
            </View>
          ) : (
            posts.length > 0 &&
            posts.map((post, index) => {
              return (
                <View key={index}>
                  <Posts
                    p={post.data()}
                    id={post.id}
                    currentUserEmail={currentUser.email}
                  />
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
      <BottomTab
        navigation={navigation}
        retrivePosts={() => {
          setPosts([]);
          fetchPosts();
        }}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    // height: "100%",
  },
});

export default HomeScreen;
