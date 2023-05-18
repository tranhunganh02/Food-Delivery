import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  SwipeView,
  FlatList,
  BackHandler,
  Modal,
} from "react-native";
//import { FlashList } from "@shopify/flash-list";
import {
  Entypo,
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import Item from "./Item";
import getPriceProductSelected from "../../features/User/getPriceProductSelected";
import { useRef } from "react";
import { Alert } from "react-native";
import changeStateProduct from "../../features/Product/changeStateProduct";
import getProductWithNameDoc from "../../features/User/getProductWithNameDoc";
const Index = ({ navigation }) => {
  const [getTotal, setTotal] = useState(0);
  const [listProduct, setListProduct] = useState({});
  const selectedProducts = useRef([]);
  const isSelectAll = useRef(false);
  const productNewState = useRef([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCheckBoxClick = (idProduct, quantity, price, image) => {
    if (selectedProducts.current.find((item) => item.idProduct === idProduct)) {
      selectedProducts.current = selectedProducts.current.filter(
        (item) => item.idProduct !== idProduct
      );
    } else {
      selectedProducts.current = [
        ...selectedProducts.current,
        {
          idProduct: idProduct,
          quantity: quantity,
          price: price,
          image: image,
        },
      ];
    }
  };
  const backAction = () => {
    if (productNewState.current.length == 0) {
      navigation.goBack();
      return true;
    }
    Alert.alert(
      "Confirm Exit",
      "Do you want to save the state all product in your cart",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: "OK",
          onPress: () => {
            changeStateProduct(productNewState.current);
            navigation.goBack();
          },
        },
      ]
    );
    return true;
  };
  useEffect(() => {
    async function getProduct() {
      const data = await getProductWithNameDoc("carts");
      setListProduct(data);
    }
    getProduct();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const addNewQuantity = (idProduct, quantity) => {
    if (productNewState.current.find((item) => item.idProduct === idProduct)) {
      productNewState.current = productNewState.current.map((item) => {
        if (item.idProduct === idProduct) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
    } else {
      productNewState.current = [
        ...productNewState.current,
        { idProduct: idProduct, quantity: quantity },
      ];
    }
  };
  const changePriceTotal = async () => {
    setTotal(await getPriceProductSelected(selectedProducts.current));
  };
  const changeQuantityProduct = (idProduct, quantity) => {
    selectedProducts.current = selectedProducts.current.map((item) => {
      if (item.idProduct === idProduct) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    console.log(quantity);
  };
  const handleClickOptionView = () => {
    setIsModalVisible(true);
  };
  const deleteItemSelect = () => {
    if (selectedProducts.current.length > 0) {
      alert("Delete item")
    }
    else{
      Alert.alert("Please choose item")
    }
  };
  const deleteAll = async () => {
    alert("Delete all")
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 0,
        alignItems: "center",
        // justifyContent: "space-between",
        paddingVertical: 5,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <View style={[styles.headerContainer, { paddingHorizontal: 15 }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            backAction();
          }}
        >
          <Ionicons name="ios-arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text>Cart Details</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {
           handleClickOptionView();
          }}
        >
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {/* display modal */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            width:'95%'
           }}>
           <View > 
              <TouchableOpacity style={styles.modalViewButton}
              onPress={()=>{deleteItemSelect()}}
              >

              <Text>Delete selected</Text>
              </TouchableOpacity>
            </View>
            <View >
              <TouchableOpacity style={styles.modalViewButton}
              onPress={()=>{deleteAll()}}
              >
              <Text>Delete all</Text>
              </TouchableOpacity>
            </View>
           </View>
            <View >
              <TouchableOpacity
              onPress={()=>{
                setIsModalVisible(false)
              }}
              >
              <AntDesign name="closecircle" size={45} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.FoodContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={listProduct}
          estimatedItemSize={5}
          renderItem={({ item }) => {
            return (
              <Item
                id={item.idProduct}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                isSelected={isSelectAll.current}
                windowHeight={windowHeight}
                windowWidth={windowWidth} //deleteSelectedElement={deleteSelectedElement}
                onQuantityChange={(id, newQuantity) => {
                  changeQuantityProduct(id, newQuantity);
                  addNewQuantity(id, newQuantity);
                  changePriceTotal();
                }}
                onClickCheckBox={(idProduct, quantity, price, image) => {
                  handleCheckBoxClick(idProduct, quantity, price, image);
                  changePriceTotal();
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.checkOutContainer}>
        <View style={styles.checkOutTotal}>
          <Text style={{ fontWeight: "400", fontSize: 15 }}>
            Total payment value:{" "}
          </Text>
          <Text style={{ color: "#F56844", marginTop: 2 }}>{getTotal} VND</Text>
        </View>
        <TouchableOpacity
          style={styles.checkOutButton}
          onPress={() => {
            if (selectedProducts.current.length > 0) {
              navigation.navigate("CheckOut", {
                product: selectedProducts.current,
              });
            } else {
              Alert.alert("Warning", "Please choose at least one product", [
                {
                  text: "Got it!",
                  style: "cancel",
                },
              ]);
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

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
  FoodContainer: {
    height: windowHeight * 0.71,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  checkOutContainer: {
    height: windowHeight * 0.13,
    width: windowWidth,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  checkOutTotal: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.4,
    justifyContent: "center",
    alignContent: "flex-start",
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 15,
  },
  checkOutButton: {
    width: windowWidth * 0.3,
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    borderTopRightRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.85,
  },
  modalViewButton: {
    height: 100,
    width: 140,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#D6DBCF',
    margin:10,
    borderRadius:20
  },
});
