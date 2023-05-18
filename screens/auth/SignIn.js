import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React,{useLayoutEffect, useState} from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import style from "./style";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import { useForm, Controller } from "react-hook-form";
import AuthInput from "../../component/User/AuthInput";
import { colors } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const SignIn = ({ navigation }) => {
  const [hiddenPass, setHiddenPass] = useState(true);
  const [getEmail, setEmail] = useState("");
  const [getPass, setPass] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Test = () => {
    alert("Please enter");
  };
  const onPressSignIn=(data) => 
  {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if(auth.currentUser.emailVerified)
        {
         navigation.navigate('BottomTab')
        }
        else{
            alert(
            "Email Not Verified",
            "Please verify your email to continue",
          );
        }
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
  }
  return (
    <View style={style.container}>
      <View style={style.Cricle1}></View>
      <View style={style.Cricle2}></View>
      <View style={style.Circle3}></View>
      <View style={style.form}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : 40}
          contentContainerStyle={{ position: "absolute" }}
        >
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign In</Text>
          </View>
          <View style={style.input}>
            <View>
              <Text style={style.text}>E-mail</Text>
              <AuthInput
                name="email"
                placeholder="Email"
                control={control}
                rules={{ required: "Email is required" }}
                style={style.inputText}
              />
            </View>
            <View>
              <Text style={style.text}>Password</Text>

              <AuthInput
                name="password"
                placeholder="Password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be minimum 8 characters long",
                  },
                }}
                secureTextEntry={hiddenPass ? true : false}
                right={
                  <TouchableOpacity
                    style={{
                      width: "10%",
                      justifyContent: "center",
                      position: "relative",
                      bottom: 10,
                      right: 0,
                    }}
                    onPress={() => setHiddenPass(!hiddenPass)}
                  >
                    <Image
                      resizeMethod="auto"
                      source={require("../../assets/icon/Hide.png")}
                    />
                  </TouchableOpacity>
                }
              />
              <TouchableOpacity
                style={{
                  width: "10%",
                  justifyContent: "center",
                  position: "absolute",
                  right: 30,
                  bottom: 10,
                }}
                onPress={() => setHiddenPass(!hiddenPass)}
              >
                <Image
                  resizeMethod="auto"
                  source={require("../../assets/icon/Hide.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={style.actionContainer}>
          <TouchableOpacity>
            <Text style={{}}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.buttonAction}
            
            onPress={handleSubmit(onPressSignIn)}
          >
            <Text style={{ color: "#fff", fontWeight: "400", fontSize: 25 }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "60%" }}>
            <Text>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={{ color: "#CD8572" }}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.socialContainer}>
        <View style={style.socialHeader}>
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
          <Text style={{}}>Sign in with</Text>
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
        </View>
        <View style={style.socialBottom}>
          <TouchableOpacity style={style.socialButton}
          onPress={()=>{navigation.navigate("SignUp")}}>
            <FontAwesome5 name="facebook" size={45} color="#1C7DD7" />
            <Text>FaceBook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.socialButton}>
            <Image source={require("../../assets/icon/Google.png")} />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
