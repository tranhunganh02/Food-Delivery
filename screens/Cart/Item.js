import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import { CheckBox } from "react-native-elements";
const Item = ({
  id,
  name,
  quantity,
  price,
  image,
  windowHeight,
  windowWidth,
  deleteSelectedElement,
  onQuantityChange,
  onClickCheckBox
}) => {
  const [getQuantity, setQuantity] = useState(quantity);
  const [checked, setChecked] = useState(false);
  const getPrice = (priceProduct, quantityProduct) => {
    return priceProduct * quantityProduct;
  };
  // Gọi hàm callback onQuantityChange với giá trị quantity mới khi thay đổi số lượng sản phẩm
  const handleQuantityChange = (newQuantity,price) => {
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity,price);
  };
  const getCheckboxChecked = (idProduct) => {
    checked ? setChecked(false) : setChecked(true);

    onClickCheckBox(idProduct, getQuantity,getQuantity*price);
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#FDFDFD",
        height: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        paddingLeft: 10,
      }}
    >
      <CheckBox
        onPress={() => {
          getCheckboxChecked(id);
        }}
        checked={checked}
      />
      <Image
        source={{ uri: image }}
        style={{
          height: windowHeight * 0.115,
          width: windowWidth * 0.335,
        }}
      />
      <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
        <View style={{ marginLeft: 40, marginTop: 10 }}>
          <Text>{name.toUpperCase()}</Text>
          <Text style={{ fontWeight: "600", paddingTop: 10, color: "#F56844" }}>
            {new Intl.NumberFormat("de-DE").format(
              getPrice(price, getQuantity)
            )}{" "}
            VND
          </Text>
        </View>
        <View
          style={{ alignItems: "center", flexDirection: "row", padding: 10 }}
        >
          <TouchableOpacity
            style={styles.foodButton}
            onPress={() => {
              if (getQuantity > 1) handleQuantityChange(getQuantity - 1);
            }}
          >
            <AntDesign name="minus" size={20} color="black" />
          </TouchableOpacity>
          <Text style={{ padding: 10 }}>{getQuantity}</Text>
          <TouchableOpacity
            style={styles.foodButton}
            onPress={() => {
              handleQuantityChange(getQuantity + 1);
            }}
          >
            <AntDesign name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity
      //  onPress={() => deleteSelectedElement(id, name)}
      style={{
        right:10,
        padding:10,
      }}
      >
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  foodButton: {
    padding: 4,
    borderWidth: 0.4,
    borderColor: "#E2E2E2",
    marginHorizontal: 5,
  },
});

export default Item;
