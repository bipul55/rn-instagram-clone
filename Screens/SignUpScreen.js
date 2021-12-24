import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const register = async () => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        const randomImage =
          "https://source.unsplash.com/random/200x200?sig=" +
          Math.round(Math.random() * 10 + 1);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            user_uid: data.user.uid,
            email: email,
            username: username,
            progilePic: randomImage,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image
          style={style.logo}
          source={{
            uri: "https://img.icons8.com/color/48/000000/instagram-new--v1.png",
          }}
        />
      </View>
      <View style={{ width: "100%", marginTop: 50 }}>
        <TextInput
          style={style.inputField}
          placeholderTextColor="#444"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoFocus={true}
          autoCorrect={false}
          onChangeText={setEmail}
        />
        <TextInput
          style={style.inputField}
          placeholderTextColor="#444"
          placeholder="Username"
          autoCorrect={false}
          onChangeText={setUsername}
        />
        <TextInput
          style={style.inputField}
          placeholderTextColor="#444"
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <View
        style={{
          marginBottom: 30,
        }}
      ></View>
      <Pressable style={style.login} onPress={register}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            color: "#FFF",
          }}
        >
          Register
        </Text>
      </Pressable>
      <View style={style.signUpContainer}>
        <Text>Already have an account ?</Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#6bb0F5" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },
  logoContainer: {},
  logo: {
    height: 100,
    width: 100,
  },
  inputField: {
    backgroundColor: "#FAFAFA",
    marginTop: 10,
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
  },
  login: {
    backgroundColor: "#0096F6",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  signUpContainer: {
    marginTop: 50,
  },
});
export default SignUpScreen;
