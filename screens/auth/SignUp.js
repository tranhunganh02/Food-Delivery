import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import style from "./style";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const SignUp = ({ navigation }) => {
  return (
     <View
     style={style.container}
   >
     <View style={style.Cricle1}></View>
     <View style={style.Cricle2}></View>
     <View style={style.Circle3}></View>
     <View
       style={style.form}
     >
       <KeyboardAvoidingView
         behavior={Platform.OS === "android" ? "padding" : 40}
         contentContainerStyle={{ position: "absolute" }}
       >
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign Up</Text>
          </View>
          <View
            style={style.input2}
          >
            <Text style={style.text}>
              Full name
            </Text>
            <TextInput
              placeholder="Your full name"
              style={style.inputText}
            />
            <Text style={style.text}>
              E-mail
            </Text>
            <TextInput
              placeholder="Enter your email"
              style={style.inputText}
            />
            <Text style={style.text}>
              Password
            </Text>
            <TextInput
              placeholder="Password"
              style={style.inputText}
            />
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
          >
            <Text style={{ color: "#fff", fontWeight: "400", fontSize: 25 }}>
              Register
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "60%" }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
               style={{ height:30, width:50}}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "#CD8572" }}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={style.socialContainer}
      >
        <View
          style={style.socialHeader}
        >
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
          <Text style={{}}>Sign up with</Text>
          <View
            style={{ borderBottomWidth: 0.5, width: windowWidth * 0.25 }}
          ></View>
        </View>
        <View
          style={style.socialBottom}
        >
          <TouchableOpacity
            style={style.socialButton}
          >
            <FontAwesome5 name="facebook" size={45} color="#1C7DD7" />
            <Text>FaceBook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.socialButton}
          >
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
