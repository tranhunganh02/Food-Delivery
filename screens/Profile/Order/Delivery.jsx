import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
const windowHeight = Dimensions.get("window").height;
import a from "./a";
import ItemDeliver from "./ItemDeliver";
export default function Delivery() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    //setProduct(b)
  }, []);
  return (
    <View style={{ padding: 10, flex:1 }}>
      <FlatList
      data={a.item[0].order}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
     return(
      <>
      <ItemDeliver key={index} status={item.status} total={item.total} id={item.id} dataFood={item.dataFood} windowHeight={windowHeight}/>
     </>
     )
      }}
      />
    </View>
  );
}

