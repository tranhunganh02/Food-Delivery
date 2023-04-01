import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import React from "react";
import SelectDropdown from "react-native-select-dropdown";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const countries = ["Egypt", "Canada", "Australia", "Ireland"];
const Address = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
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
          <Ionicons name="ios-arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text>Your address</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <AntDesign name="pluscircleo" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <SelectDropdown
          data={countries}
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
      </View>
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
