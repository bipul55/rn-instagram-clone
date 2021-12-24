import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log("user signed in");
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(
          "Login Failed!!!",
          "The credintials you provided are incorrect",
          [
            {
              text: "OK",
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => {
                navigation.navigate("SignUp");
              },
            },
          ]
        );
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
          autoFocus={true}
          autoCorrect={false}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={style.inputField}
          placeholderTextColor="#444"
          placeholder="Password"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          width: "100%",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "#6bb0F5" }}> Forgot Password ?</Text>
      </View>
      {!loading ? (
        <Pressable style={style.login} onPress={login}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              color: "#FFF",
            }}
          >
            Login
          </Text>
        </Pressable>
      ) : (
        <Pressable style={style.login}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              color: "#FFF",
            }}
          >
            Logging In
          </Text>
        </Pressable>
      )}

      <View style={style.signUpContainer}>
        <Text>Don't have an account ?</Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "#6bb0F5" }}>Sign Up</Text>
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
export default LoginScreen;
