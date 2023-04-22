import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Pressable,
  Imgae,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const host = "https://provinces.open-api.vn/api/";
const Information = ({ navigation }) => {
  useEffect(() => {}, []);
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [sex, setSex] = useState()
  function br (sex1) {
    setSex(sex1)
    console.log(sex);
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // setSelectedDate(date.toISOString().slice(0, 10));
    setSelectedDate(date)
    hideDatePicker();
    console.log(date.toISOString().slice(0, 10));
  };
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
        <Text>Infornation</Text>
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
        <View style={styles.conponent}>
          <Text style={styles.conponentText}>Full name</Text>
          <TextInput
            style={[styles.conponentInput]}
            placeholder={"Name"}
          ></TextInput>
        </View>
        <View style={styles.conponent}>
          <Text style={styles.conponentText}>Password</Text>
          <TextInput
            style={styles.conponentInput}
            placeholder="Password"
          ></TextInput>
        </View>
        <View style={styles.conponent}>
          <Text style={styles.conponentText}>Birthday</Text>

          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={[
              { justifyContent: "center", alignItems: "center" },
              styles.conponentInput,
            ]}
          >
            <Image
              source={require("../../../assets/icon/calendar.png")}
              style={{ position: "absolute", left: 15, bottom: 15 }}
            ></Image>
            {selectedDate != null ? <Text style={{fontSize:17.5}}>{selectedDate.toISOString().slice(0, 10)}</Text> : null}
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={selectedDate}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.conponent}>
          <Text style={styles.conponentText}>Gender</Text>
          <SelectDropdown
            defaultButtonText="Gender"
            buttonStyle={[styles.conponentInput]}
            data={["Male", "Female"]}
            onSelect={(selectedItem, index) => {
              br(selectedItem)
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
        <Pressable
          onPress={() => {
            InsertAdrress();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "#BFCBAE",
              width: "80%",
              height: windowHeight * 0.08,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
              position: "absolute",
              bottom: 0,
            },
            styles.wrapperCustom,
          ]}
        >
          {<Text style={{ color: "#fff" }}>UPDATE</Text>}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Information;

const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.08,
    width: "82%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
    position: "absolute",
    left: 0,
  },
  conponent: {
    width: "86%",
    marginBottom: 15,
  },
  conponentText: {
    color: "#9796A1",
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 7,
  },
  conponentInput: {
    width: "100%",
    height: windowHeight * 0.065,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#000",
    fontSize: 18,
    backgroundColor: "#fff",
    borderColor: "#AEAEAE",
  },
  showImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
    position: "absolute",
    bottom: 0,
  },
  focusInput: {
    borderColor: "#FE724C",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: "center",
    width: windowWidth * 0.48,
  },
  modalViewButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: windowWidth * 0.3,
    marginTop: 5,
  },
});