import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Avatar } from "@rneui/themed";
import React from "react";
import {
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import ButtonPickImage from "../../features/pickImage";
import { storage } from "../../firebase";
import getUser from "../../features/getUser";
import { useState } from "react";
import { useEffect } from "react";
const height = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Index() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser("bDKl87RgMKXCqylrKHylcdiEZay2");
      setUser(userData);k
    };
   
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <Avatar
          size={125}
          rounded
          source={{
            uri: user.image,
          }}
        />
        <ButtonPickImage
          idUser={"bDKl87RgMKXCqylrKHylcdiEZay2"}
        ></ButtonPickImage>
        <Text style={styles.headerText}>Hùng Anh lỏd</Text>
        <Text style={{ bottom: 10 }}>0905113115116</Text>
      </View>
      <View
        style={{
          height: height * 0.4,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.ActionButton}
        onPress={()=>{
          navigation.navigate('Information')
        }}
        >
          <AntDesign name="profile" size={27} color="black" />
          <Text style={styles.actionText}>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}
          onPress={() =>{
            navigation.navigate('Address')
          }}
        >
          <FontAwesome name="address-book-o" size={27} color="black" />
          <Text style={styles.actionText}>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}>
          <Ionicons name="chatbox-ellipses-outline" size={27} color="black" />
          <Text style={styles.actionText}>Contact admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActionButton}
          onPress={()=>{
            
          }}
        >
          <SimpleLineIcons name="logout" size={27} color="black" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: height * 0.26,
    width: "60%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
  headerButton: {
    backgroundColor: "#26295F",
    position: "absolute",
    top: 115,
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  headerText: {
    fontWeight: "900",
    fontSize: 20,
    marginTop: 20,
  },
  ActionButton: {
    height: height * 0.058,
    marginBottom: 23,
    width: windowWidth * 0.8,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: "#A2A2A2",
  },
  actionText: {
    marginLeft: 30,
    top: 5,
  },
});
