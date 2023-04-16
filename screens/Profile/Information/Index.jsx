import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const host = "https://provinces.open-api.vn/api/";
const Information = ({ navigation }) => {
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [clickedWard, setClickedWard] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
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
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          height: windowHeight * 0.3,
          width: windowWidth,
          marginTop: 20,
        }}
      >
        <TextInput style={styles.input} placeholder={"Name"}></TextInput>
        <TextInput style={styles.input} placeholder="Password"></TextInput>
        <TextInput style={styles.input} placeholder="Your birthday"></TextInput>
        <View></View>
        <SelectDropdown
        defaultButtonText="Sex"

         buttonStyle={styles.input}
          data={['Male','Female']}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        <Pressable
          onPress={() => {
            InsertAdrress();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "#D6DBCF",
              width: "80%",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 10,
            },
            styles.wrapperCustom,
          ]}
        >
          {<Text style={styles.text}>Update</Text>}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Information;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.08,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: windowWidth * 0.127,
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
  input: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  showImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    position: "absolute",
    bottom: 0,
  },
});
