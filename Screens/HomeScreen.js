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
  const [screenLoading, setScreenLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = new Promise(async (resolve, reject) => {
    const q = query(
      collection(db, "users"),
      where("user_uid", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resolve(doc.data());
    });
  });
  const fetchPosts = async () => {
    setPostLoading(true);
    var temp = [];
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc);
    });
    setPosts([...temp]);
    setPostLoading(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  useEffect(() => {
    getUserInfo.then((data) => {
      setUserInfo({ ...data });
      setScreenLoading(false);
      if (posts.length < 1) {
        fetchPosts();
      }
    });
  }, []);

  return (
    <>
      {screenLoading ? (
        <View style={style.loadingContainer}>
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
        <SafeAreaView style={style.container}>
          <HomeScreenHeader />
          <ScrollView>
            <View>
              <Stories
                profilePic={userInfo.progilePic}
                username={userInfo.username}
              />
              {postLoading ? (
                <View>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Loading Posts
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
            profilePic={userInfo.progilePic}
          />
        </SafeAreaView>
      )}
    </>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
