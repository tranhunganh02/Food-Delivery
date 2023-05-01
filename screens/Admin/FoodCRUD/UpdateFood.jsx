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
import getProduct from "../../../features/Product/getProduct";
import PickImageProduct from "../../../features/Product/pickImageProduct";
import updateEachProduct from "../../../features/Product/updateProduct";
import uploadImage from "../../../features/uploadImage";
import { useForm } from "react-hook-form";
import AuthInput from "../../../component/User/AuthInput";
import ValidateInput from "../../../component/Product/ValidateInput";
import { useContext } from "react";
import { ProductContext } from "../../../component/Auth/Product";
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
const UpdateFood = ({ navigation, route }) => {
  //  alert(route.params?.id);
  const [nameFood, setNameFood] = useState("");
  const [priceFood, setPriceFood] = useState("");
  const [imagePicker, setImagePicker] = useState("");
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(category);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPickedImage, setIsPickedImage] = useState(false);
  const searchRef = useRef();
  const {updateProduct} = useContext(ProductContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
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
  useEffect(() => {
    async function getEachProduct() {
      const data = await getProduct(route.params.id);

      setValue("name", data.name);
      setValue("price", data.price);
      setSelectedCategory(data.selectedCategory);
      setImagePicker(data.image);
      // console.log(data);
    }
    getEachProduct();
  }, []);
  const update = async (data) => {
    if (isPickedImage) {
      let imageURL = await uploadImage({
        image: imagePicker,
        folder: "Product",
      });
      setImagePicker(imageURL);
    }
    const moreProps = {
      selectedCategory: selectedCategory,
      image: imagePicker,
      id: route.params.id,
    };
    const finalData = Object.assign({}, data, moreProps);
    updateEachProduct({ data: finalData, navigation: navigation });
    updateProduct();
  };
  async function changeImage() {
    let url = await PickImageProduct();
    if (url) {
      setIsPickedImage(true);
      setImagePicker(url);
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
        {imagePicker && (
          <Image
            source={{ uri: imagePicker }}
            style={{ width: 200, height: 200 }}
          />
        )}
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
        <ValidateInput
          name="name"
          placeholder="Food name"
          control={control}
          rules={{ required: "Food name is required" }}
        />
        <ValidateInput
          name="price"
          placeholder="Price"
          control={control}
          rules={{ required: "Price is required" }}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Price"
          value={priceFood}
          onChangeText={(number) => setPriceFood(number)}
        /> */}
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
          onPress={changeImage}
        >
          <Text>Change image</Text>
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
          onPress={handleSubmit(update)}
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
