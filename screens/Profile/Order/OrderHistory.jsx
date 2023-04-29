import { useEffect } from "react";
import { Text, View } from "react-native";
import getOrderHistory from "../../../features/User/getOrderHistory";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { FlatList } from "react-native";
import { Button } from "react-native-elements";
import getProduct from "../../../features/Product/getProduct";
import ItemProduct from "../../../screens/Product/Item";
export default Index = () => {
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    getOrderHistory().then((data) => {
      setListOrder(data);
    });
  }, []);
  return (
    <View>
      <Text> đơn hàng của m nè th ngu</Text>
      <FlatList
        data={listOrder}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text>ngày {index}</Text>
              {item.data.map((order) => {
                return (
                  <View>
                    <ItemProduct
                      id={order.idProduct}
                      quantity={order.quantity}
                    />
                  </View>
                );
              })}
            </View>
          );
        }}
      />
      <Button
        title={"cc"}
        onPress={() => {
          console.log(listOrder);
        }}
      ></Button>
    </View>
  );
};
