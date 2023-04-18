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
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddAddress from "../../../features/User/AddAddress";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const host = "https://provinces.open-api.vn/api/";
const CreateAddress = ({ navigation }) => {
  const [city, setCity] = useState(null);
  const [clickedCity, setClickedCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [district, setDistrict] = useState(null);
  const [clickedDistrict, setClickedDistrict] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [ward, setWard] = useState(null);
  const [clickedWard, setClickedWard] = useState(false);
  const [selectedWard, setSelectedWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(null);
  var callAPICity = () => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((response) => {
      setCity(response.data);
    });
  };
  var callApiDistrict = (api) => {
    axios.get(api).then((response) => {
      setDistrict(response.data.districts);
    });
  };
  var callApiWard = (api) => {
    return axios.get(api).then((response) => {
      setWard(response.data.wards);
    });
  };
  useEffect(() => {
    callAPICity();
  }, [selectedCity, selectedDistrict]);
  const insertAddress =( ) => {
    
    if(selectedCity && selectedDistrict && selectedWard && specificAddress && phoneNumber) {
      const data ={ city: selectedCity,district: selectedDistrict ,ward: selectedWard,specificAddress : specificAddress,phoneNumber: phoneNumber}
      AddAddress(data);
    }
   
  }
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
        {/* city */}
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            setClickedCity(!clickedCity);
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {selectedCity == "" ? "Select City" : selectedCity}
          </Text>
          {clickedCity ? (
            <Image
              source={require("../../../assets/icon/upload.png")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Image
              source={require("../../../assets/icon/dropdown.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
        </TouchableOpacity>
        {clickedCity ? (
          <View
            style={{
              marginTop: 10,
              height: windowHeight * 0.6,
              alignSelf: "center",
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <FlatList
              data={city}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 65,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#8e8e8e",
                    }}
                    onPress={() => {
                      setSelectedCity(item.name);
                      setClickedCity(!clickedCity);
                      callApiDistrict(host + "p/" + item.code + "?depth=2");
                      setSelectedDistrict('');
                      setSelectedWard('');
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
        {/* district */}
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            setClickedDistrict(!clickedDistrict);
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {selectedDistrict == "" ? "Select District" : selectedDistrict}
          </Text>
          {clickedDistrict ? (
            <Image
              source={require("../../../assets/icon/upload.png")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Image
              source={require("../../../assets/icon/dropdown.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
        </TouchableOpacity>
        {clickedDistrict && selectedCity != '' ? (
          <View
            style={{
              elevation: 5,
              marginTop: 10,
              height: windowHeight * 0.6,
              alignSelf: "center",
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <FlatList
              data={district}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 65,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#8e8e8e",
                    }}
                    onPress={() => {
                      setSelectedDistrict(item.name);
                      setClickedDistrict(!clickedDistrict);
                      callApiWard(host + "d/" + item.code + "?depth=2");
                      setSelectedWard('');
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
        {/* ward */}
        <TouchableOpacity
          style={{
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
          }}
          onPress={() => {
            setClickedWard(!clickedWard);
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {selectedWard == "" ? "Select Ward" : selectedWard}
          </Text>
          {clickedWard ? (
            <Image
              source={require("../../../assets/icon/upload.png")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Image
              source={require("../../../assets/icon/dropdown.png")}
              style={{ width: 20, height: 20 }}
            />
          )}
        </TouchableOpacity>
        {clickedWard && selectedDistrict!='' ? (
          <View
            style={{
              elevation: 5,
              marginTop: 10,
              height: windowHeight * 0.6,
              alignSelf: "center",
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <FlatList
              data={ward}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 65,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#8e8e8e",
                    }}
                    onPress={() => {
                      setSelectedWard(item.name);
                      setClickedWard(!clickedWard);
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter specific address"
          value={specificAddress}
          onChangeText={setSpecificAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity
          style={{
            // width: "80%",
            // height: 50,
            // backgroundColor: "#00CC00",
            // borderRadius: 10,
            // justifyContent: "center",
            // alignItems: "center",
            // marginTop: 300,
          }}
          onPress={insertAddress}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
            }}
          >
            Insert
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.showImage}></View>
    </SafeAreaView>
  );
};

export default CreateAddress;

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
    borderColor: "black",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 15,
    borderWidth: 1,
    height: windowHeight * 0.055,
    color:'#000'
  },
  showImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    position: "absolute",
    bottom: 0,
  },
});
