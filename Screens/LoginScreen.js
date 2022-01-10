import React, { useEffect, useState, useRef } from "react";
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
import InstagramLogin from "react-native-instagram-login";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const InstaLoginRef = useRef(null);

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
  // Instragram login success
  const loginSuccess = async (data) => {
    /* 
    data={
      user_id;
      access_token
    }
    */

    // fetch for the users media, i.e Posts
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption&access_token=${data.access_token}`
    )
      .then((response) => response.json())
      .then((post) => {
        /*
         post.data is an array of objects that contain post id and post caption 
        */
        //  after getting post id, we fetch the total post information
        fetch(
          `https://graph.instagram.com/${post.data[0].id}?fields=id,media_type,media_url,username,timestamp&access_token=${data.access_token}`
        )
          .then((p) => p.json())
          .then((p) => {
            // p is an post information
            console.log(p);
          });
      })
      .catch((err) => {
        console.log("err", err);
      });
    // fetch the user information, ie username
    fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${data.access_token}`
    )
      .then((response) => response.json())
      .then((d) => {
        console.log("response data", d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   console.log("useEffect", InstaLoginRef);
  // }, [InstaLoginRef]);
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
      <TouchableOpacity
        style={style.insta_login}
        onPress={() => {
          InstaLoginRef.current.show();
        }}
      >
        <Image
          style={{ height: 50, width: 50, marginRight: 20 }}
          source={{
            uri: "https://img.icons8.com/color/48/000000/instagram-new--v1.png",
          }}
        />
        <Text style={{ fontSize: 15, color: "white" }}>
          Login With Instagram
        </Text>
      </TouchableOpacity>
      {/* instagram Login */}
      <InstagramLogin
        ref={InstaLoginRef}
        appId="1817113448678856"
        appSecret="31289c2d276222f1e475eff35ca2f1e4"
        redirectUrl="https://github.com/"
        scopes={["user_profile", "user_media"]}
        onLoginSuccess={loginSuccess}
        onLoginFailure={(data) => console.log(data)}
        wrapperStyle={{ borderWidth: 0 }}
      />
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
  insta_login: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4682b4",
    paddingLeft: 10,
  },
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
