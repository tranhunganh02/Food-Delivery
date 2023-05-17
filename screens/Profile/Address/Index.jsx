import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import a from "../a";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
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
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
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
          <Ionicons name="ios-arrow-back" size={26} color="black" />
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
          <FontAwesome5 name="exchange-alt" size={23} color="black" />
        </TouchableOpacity>
      </View>       
        <View  style={styles.component}>
          <View
            style={styles.componentInformation}
          >
            <Text style={styles.componentText}>Full name</Text>
            <Text style={styles.componentText}>{user.name}</Text>
          </View>
          <View
            style={styles.componentInformation}
          >
            <Text style={styles.componentText}>Phone number</Text>
            <Text style={styles.componentText}>{user.phoneNumber}</Text>
          </View>
          <View
             style={styles.componentInformation}
          >
            <Text style={styles.componentText}>City</Text>
            <Text style={styles.componentText}>{user.city}</Text>
          </View>
          <View
             style={styles.componentInformation}
          >
            <Text style={styles.componentText}>District</Text>
            <Text style={styles.componentText}>{user.district}</Text>
          </View>
          <View
             style={styles.componentInformation}
          >
            <Text style={styles.componentText}>Ward</Text>
            <Text style={styles.componentText}>{user.ward}</Text>
          </View>
          <View
             style={styles.componentInformation}
          >
            <Text style={styles.componentText}>Specific address</Text>
            <Text style={styles.componentText}>{user.specificAddress}</Text>
          </View>
        </View>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{navigation.navigate("Update Address")}}
      >
        <Text style={{ color: "#fff", fontSize: 19 }}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.145,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 8,
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
  component: {
    width: "100%",
    height: windowHeight * 0.65,
    paddingVertical: 35,
    paddingHorizontal:2
  },
  componentInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  componentText: {
    fontSize: 20,
    fontWeight: "400",
  },
  button:{
    height: windowHeight * 0.08,
          width: windowWidth * 0.6,
          backgroundColor: "#BFCBAE",
          marginBottom: 15,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
  }
});
