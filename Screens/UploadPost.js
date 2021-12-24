import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const UploadPost = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onChangeCaption = (text) => {
    setCaption(text);
  };

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

  const sharePost = async () => {
    setLoading(true);
    // get the image url
    const I = image;
    // from the url get the image name and assign it to imageName
    var imageName = I.split("/");
    // to make it unique add the current date in front of the image
    imageName = Date.now() + imageName[imageName.length - 1];
    // set the firebase storage reference
    const imageRef = ref(storage, `post/image/` + imageName);
    // convert the image to blob object
    const img = await fetch(image);
    const blobImg = await img.blob();
    // upload process starts here
    uploadBytes(imageRef, blobImg)
      .then((snapshot) => {
        // image uploaded
        // now get the url to access the image from firebase storage
        getDownloadURL(ref(storage, snapshot.ref.fullPath)).then(
          async (url) => {
            // add new post document to the database
            try {
              const userData = await getUserInfo;
              const docRef = await addDoc(collection(db, "posts"), {
                imageUrl: url,
                userName: userData.username,
                likes: [],
                caption: caption,
                profilePic: userData.progilePic,
                comments: [],
              });
              // if the document is uploaded navigate back to main page
              navigation.goBack();
            } catch (e) {
              Alert.alert("Something Went Wrong", "Please Try again", [
                {
                  text: "Home Page",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]);
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    pickImage();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={style.icon}
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/back.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", margin: 20 }}>
        {image && <Image source={{ uri: image }} style={style.image} />}
        <TextInput
          onChangeText={onChangeCaption}
          placeholderTextColor={"gray"}
          value={caption}
          placeholder="Write a caption"
          style={style.caption}
        />
      </View>

      {image ? (
        loading ? (
          <Button title="Sharing Post" />
        ) : (
          <Button title="Share" onPress={sharePost} />
        )
      ) : (
        <Button title="Upload Image" onPress={pickImage} />
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  icon: {
    height: 30,
    width: 30,
    margin: 20,
    marginLeft: 0,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 20,
    flex: 2,
  },
  caption: {
    color: "white",
    flex: 5,
    marginBottom: 50,
    borderRadius: 5,
    fontSize: 18,
  },
});
export default UploadPost;
