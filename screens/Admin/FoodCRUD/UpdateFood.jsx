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
import React, { useRef, useState } from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const category = [
  { name: "Cafe", id: "1" },
  { name: "Milk tea", id: "2" },
  { name: "Breakfast", id: "3" },
  { name: "Lunch tea", id: "4" },
  { name: "Dinner", id: "5" },
  { name: "Smoothies/Juices", id: "6" },
  { name: "Snacks", id: "7" },
  { name: "Noodles", id: "8" },
];
const UpdateFood = ({ navigation, id, name, price }) => {
  const [nameFood, setNameFood] = useState("");
  const [priceFood, setPriceFood] = useState("");
  const [imagePicker, setImagePicker] = useState("");
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(category);
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchRef = useRef();
  const onSearch = (search) => {
    if (search !== "") {
      let tempData = data.filter((item) => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(category);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        backgroundColor: "#fff",
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
          <Ionicons name="chevron-back-outline" size={33} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
          }}
        >
          Update
        </Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {
            ex();
          }}
        >
          <AntDesign name="plus" size={33} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.showImage}>
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
        ></Image>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          height: windowHeight * 0.3,
          width: windowWidth,
          marginTop: 15,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Food name"
          value={nameFood}
          onChangeText={setNameFood}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={priceFood}
          onChangeText={(number) => setPriceFood(number)}
        />
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            borderRadius: 10,
            borderWidth: 0.5,
            alignSelf: "center",
            marginTop: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Text>Choose image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 55,
            borderRadius: 10,
            borderWidth: 0.5,
            alignSelf: "center",
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
          }}
          onPress={() => {
            setClicked(!clicked);
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {selectedCategory == "" ? "Select category" : selectedCategory}
          </Text>
          {clicked ? (
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
        {clicked ? (
          <View
            style={{
              elevation: 5,
              marginTop: 10,
              height: 180,
              alignSelf: "center",
              width: "90%",
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "absolute",
            }}
          >
            <TextInput
              placeholder="Search.."
              value={search}
              ref={searchRef}
              onChangeText={(txt) => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: "90%",
                height: 50,
                alignSelf: "center",
                borderWidth: 0.2,
                borderColor: "#8e8e8e",
                borderRadius: 7,
                marginTop: 20,
                paddingLeft: 20,
              }}
            />

            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      height: 50,
                      justifyContent: "center",
                      borderBottomWidth: 0.5,
                      borderColor: "#8e8e8e",
                    }}
                    onPress={() => {
                      setSelectedCategory(item.name);
                      setClicked(!clicked);
                      onSearch("");
                      setSearch("");
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#00CC00",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
            }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.08,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 25,
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
    padding: 10,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    borderWidth: 1,
    height: 50,
  },
  showImage: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.286,
    position: "relative",
  },
});
export default UpdateFood;
