import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
const windowHeight = Dimensions.get("window").height;
import a from "../../home/a";
import ModalOrder from "./ModalOrder";
import ModalLoading from "../../../component/User/ModalLoading";
import getOrderHistory from "../../../features/User/getOrderHistory";
export default function OrderHistory() {
  const [product, setProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function ModalVisible () {
    setModalVisible(!modalVisible)
  }
  useEffect(() => {
    getOrderHistory(3).then((data) => {
      setProduct(data);
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{ width: "100%", height: windowHeight * 0.8, marginTop: 20 }}
      >
        <ModalLoading
        visible={isLoading}
        time={1500}
        onLoading={(isEnd) => setIsLoading(isEnd)}
      />
        <FlatList
          showsVerticalScrollIndicator={false}
          horizontal={false}
          data={product}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                  key={item.id}
                >
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    {new Date(Number(Date.now())).toDateString()}
                  </Text>
                  <Text>{item.data.length} order</Text>
                </View>
                <ModalOrder data={item.data} total={item.total} id={item.id}/>
              </>
            );
            
          }}
        />
       
      </View>
      
    </View>
  );
}
const Item = ({ name, quantity, price, image }) => {
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: "#B7B7B7",
        height: windowHeight * 0.2,
        width: "100%",
        marginBottom: 20,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          height: "80%",
          width: "40%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "400" }}> {name}</Text>
        <Text>{new Intl.NumberFormat("de-DE").format(price)} VND</Text>
      </View>
      <View
        style={{
          height: "80%",
          width: "45%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Quantity: {quantity}</Text>
        <Image
          source={{ uri: image }}
          style={{
            height: windowHeight * 0.1,
            width: "90%",
            borderRadius: 2,
          }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
