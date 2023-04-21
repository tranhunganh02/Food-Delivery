import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import a from "../a";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import ItemAddress from "./ItemAddress";
import getUser from "../../../features/User/getUser";
import { auth } from "../../../firebase";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Address = ({ navigation }) => {
  async function fetchBooks() {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=1");
    const json = await response.json();
    updateBooks(json.data);
  }
  const [user,setUser] =useState({});
  useEffect(()=> {
    async function getAddress(){
      var result =await getUser(auth.currentUser.uid);
      setUser(result);
    }
    getAddress();
  },[])
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text>Your address</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {
            navigation.navigate("Create Address");
          }}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ItemAddress
        navigation={navigation}
        name={user.name}
        id={user.id}
        phoneNumber={user.phoneNumber}
        city={user.city}
        district={user.district}
        ward={user.ward}
        specificAddress={user.specificAddress}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.145,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: windowWidth * 0.13,
    height: windowHeight * 0.06,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 50,
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
  },
});
