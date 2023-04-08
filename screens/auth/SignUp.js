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
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import style from "./style";
import AuthInput from "../../component/User/AuthInput";
import { useForm } from "react-hook-form";
import { auth, dbFirestore, dbStore } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const SignUp = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hiddenPass, setHiddenPass] = useState(true);
  const onPressSignUp = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        sendEmailVerification(auth.currentUser).then(async () => {
          await setDoc(doc(dbStore, "users", userCredential.user.uid), {
            name: data.fullname,
            state: "CA",
            country: "USA",
          }).then(() => {
            navigation.navigate("SignIn");
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign Up</Text>
          </View>
          <View style={style.input2}>
            <View>
              <Text style={style.text}>Full name</Text>
              <AuthInput
                name="fullname"
                placeholder="Full name"
                control={control}
                rules={{ required: "Fullname is required" }}
                style={style.inputText}
              />
            </View>
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
        <View
          style={{
            height: windowHeight * 0.2,
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={style.buttonAction}
            onPress={handleSubmit(onPressSignUp)}
          >
            <Text style={{ color: "#fff", fontWeight: "400", fontSize: 25 }}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "60%" }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              style={{ height: 30, width: 50 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#CD8572" }}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.socialContainer}>
        <View style={style.socialHeader}>
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
          <Text style={{}}>Sign up with</Text>
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
        </View>
        <View style={style.socialBottom}>
          <TouchableOpacity style={style.socialButton}>
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

export default SignUp;

const styles = StyleSheet.create({});
