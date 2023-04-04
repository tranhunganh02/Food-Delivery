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
const SignIn = ({ navigation }) => {

  useLayoutEffect(()=>{
   
  })

     const [hiddenPass, setHiddenPass] = useState(true);
     const [getEmail, setEmail] = useState('');
     const [getPass, setPass] = useState('');
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
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Sign In</Text>
          </View>
          <View style={style.input}>
           <View style={{height:'auto'}}>
            <Text style={style.text}>E-mail</Text>
              <TextInput placeholder="Enter your email" 
                style={style.inputText} 
                value={getEmail}
                onChangeText={(text) => setEmail(text)}
              />
           </View>
            <View>
            <Text style={style.text}>Password</Text>
            <TextInput placeholder="Password" style={style.inputText} 
                value={getPass}
                onChangeText={(text) => setPass(text)} 
                secureTextEntry={hiddenPass? true : false}
            />
            <TouchableOpacity style={{width:'10%',  justifyContent:'center', position:'absolute', bottom:35, right:30}}
                              onPress={() => setHiddenPass(!hiddenPass)}>
              <Image resizeMethod='auto' source={require('../../assets/icon/Hide.png')} />
            </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={style.actionContainer}>
          <TouchableOpacity>
            <Text style={{}}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttonAction}
               onPress={()=> {
                    navigation.navigate('BottomTab')
               }}
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

export default SignIn;
