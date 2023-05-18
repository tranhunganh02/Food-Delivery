import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  SwipeView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import a from "../home/a";
import Item from "./Item";
import getProductCheckOut from "../../features/User/getProductCheckOut";
import { async } from "@firebase/util";
import getPriceProductSelected from "../../features/User/getPriceProductSelected";
import createOrder from "../../features/User/createOrder";
import ModalLoading from "../../component/User/ModalLoading";
import getPriceToSale from "../../features/User/getPriceToSale";
import { useContext } from "react";
import { AppContext } from "../../component/Auth/AuthContext";
import { CountContext } from "../../component/Auth/QuatityInCart";
import PaymentModal from "../../component/User/PaymentModal";

const Index = ({ navigation, route }) => {
  const [getTotal, setTotal] = useState(0);
  const [listFood, setListFood] = useState([]);
  const [price, setPrice] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [textDiscount, setTextDiscount] = useState("");
  const { user } = useContext(AppContext);
  const { updateCount } = useContext(CountContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  const toggleModal = async () => {
    setModalVisibleImage(false);
    setPaymentMethod("COD");
    setPrice(await getPriceProductSelected(route.params.product));
  };
  const handlePaymentMethod = async (method) => {
    setModalVisible(false);
    setPaymentMethod(method);
    if (method == "Online") {
      setModalVisibleImage(true);
    } else {
      setPrice(await getPriceProductSelected(route.params.product));
    }
  };
  useEffect(() => {
    async function fetchProduct() {
      let result = await getProductCheckOut(route.params.product);
      setListFood(result);
      setPrice(await getPriceProductSelected(route.params.product));
    }
    fetchProduct();
  }, []);
  const salePriceProduct = async () => {
    let priceToSale = await getPriceToSale(textDiscount);
    if (!priceToSale) {
      alert("Voucher code does not exist!");
    } else {
      setPrice((prePrice) =>
        prePrice - priceToSale > 0 ? prePrice - priceToSale : 0
      );
    }
  };
  const confirmOrder = async () => {
    if (user.city && user.district && user.ward && user.specificAddress) {
      createOrder({
        data: route.params.product,
        total: Number(price),
        address:
          user.city +
          "- " +
          user.district +
          "- " +
          user.ward +
          "- " +
          user.specificAddress,
        methodPay: paymentMethod,
      });
      updateCount();
      navigation.navigate("Order");
    } else {
      Alert.alert("Warning", "Please update your address");
      navigation.navigate("Address");
    }
  };
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
        <Text>Cart Details</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.FoodContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={listFood}
          renderItem={({ item }) => {
            return (
              <Item
                id={item.key}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                windowHeight={windowHeight}
                windowWidth={windowWidth}
              />
            );
          }}
        ></FlatList>
      </View>
      <View
        style={{
          width: "100%",
          height: windowHeight * 0.08,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={24}
            color="black"
            style={{
              position: "absolute",
              left: 15,
            }}
          />
          <TextInput
            placeholder="Discount code"
            style={{
              width: windowWidth * 0.4,
              height: 40,
              marginLeft: 25,
              fontSize: 17,
            }}
            onChangeText={(text) => setTextDiscount(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              borderRadius: 20,
              width: windowWidth * 0.23,
              height: windowHeight * 0.045,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              salePriceProduct();
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: windowHeight * 0.15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: windowHeight * 0.07,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#B6B2B2",
              fontSize: 18,
            }}
          >
            Item Total:
          </Text>
          <Text
            style={{
              color: "#B6B2B2",
              fontSize: 18,
            }}
          >
            {new Intl.NumberFormat("de-DE").format(price)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: windowHeight * 0.07,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#B6B2B2",
              fontSize: 18,
            }}
          >
            Delivery:
          </Text>
          <Text
            style={{
              color: "#B6B2B2",
              fontSize: 18,
            }}
          >
            Free
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: windowHeight * 0.07,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ fontSize: 20 }}>Choose a payment method</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "#B6B2B2",
              fontSize: 18,
            }}
          >
            {paymentMethod}
          </Text>
        </View>
      </View>
      {/* Modal display image QR code bank */}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleImage}
          onRequestClose={() => {
            setModalVisibleImage(false);
          }}
        >
          <View style={styles.modal}>
            <Image
              style={styles.image}
              resizeMode="contain" // chỉnh hiển thị ảnh
              source={require("../../assets/image/qrcode.jpg")}
            />
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: -50,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{ padding: 10, marginLeft: -20 }}
                onPress={() => {
                  toggleModal();
                }}
              >
                <Text style={[styles.text, { color: "red", fontSize: 19 }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10, marginRight: -20 }}
                onPress={() => {
                  setPrice(0);
                  setModalVisibleImage(false);
                }}
              >
                <Text style={[styles.text, { color: "green", fontSize: 19 }]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/* Choose method pay */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PaymentModal visible={modalVisible} onClose={handlePaymentMethod} />
      </View>
      <View style={styles.checkOutContainer}>
        <View style={styles.checkOutTotal}>
          <Text style={{ fontWeight: "500", fontSize: 19 }}>Total</Text>
          <Text>{new Intl.NumberFormat("de-DE").format(price)} VND</Text>
        </View>
        <TouchableOpacity
          style={styles.checkOutButton}
          onPress={() => {
            confirmOrder();
          }}
        >
          <Text style={{ color: "#fff" }}>Payment</Text>
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
    height: windowHeight * 0.37,
    width: "100%",
  },
  checkOutContainer: {
    height: windowHeight * 0.17,
    width: windowWidth,
    backgroundColor: "#fff",
    padding: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkOutTotal: {
    height: windowHeight * 0.1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 10,
  },
  checkOutButton: {
    width: "100%",
    height: windowHeight * 0.085,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
