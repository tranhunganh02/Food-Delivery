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
import a from "./a";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios"
import ItemAddress from "./ItemAddress";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Address = ({navigation}) => {

  const host = "https://provinces.open-api.vn/api/";
  var callAPI = async () => {
    return axios.get('https://provinces.open-api.vn/api/?depth=1')
        .then((response) => {
          setCity([...city, response.data])
        });
  }
  var callApiDistrict = async (api) => {
    return axios.get(api)
        .then((response) => {
            console.log(response.data);
        });
  }
  var callApiWard = async (api) => {
    return await axios.get(api)
        .then((response) => {
          console.log(response.data.ward);
        });
}
const [books, updateBooks] = React.useState([]);
async function fetchBooks() {
  const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
  const json = await response.json();
  updateBooks(json.data);
  }
  function ex (){
    fetchBooks()
    console.log(books);
  }
  const [listAddress, setListAddress] = useState(a.user)
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
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
            ex()
          }}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
     <ScrollView
     style={{
      width:'90%',
      height: windowHeight*0.4
     }}
     >
      {listAddress.map((item, index) => (
            <ItemAddress navigation={navigation} key={index} name={item.name} id={item.id} phoneNumber={item.phoneNumber} city={item.city} district={item.district} ward={item.ward} specificAddress={item.specificAddress}/>
        ))}
     </ScrollView>
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
