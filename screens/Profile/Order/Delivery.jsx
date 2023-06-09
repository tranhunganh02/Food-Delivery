import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity 
} from "react-native";
import React, { useEffect, useState } from "react";
const windowHeight = Dimensions.get("window").height;

import a from "./a";
// return (
//   <View style={{ padding: 5 }}>
//     <ScrollView>
//       {/* Order1 */}
//       <View
//         style={{
//           width: "100%",
//           flex: 1,
//           justifyContent: "flex-start",
//           alignItems: "center",
//           padding: 20,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "600" }}>Status</Text>
//           <Text>Confirmation order</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             marginTop: 10,
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "600" }}>#2196F3</Text>
//           <Text>{productPre.length}</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             marginTop: 10,
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "500" }}>Total</Text>
//           <Text>{new Intl.NumberFormat("de-DE").format(pricePre)} VND</Text>
//         </View>
//         <View
//           style={{ width: "100%", height: windowHeight * 0.7, marginTop: 30 }}
//         >
//           {productPre.map((item, index) => {
//             return (
//               <View
//                 style={{
//                   borderWidth: 0.5,
//                   borderColor: "#B7B7B7",
//                   height: windowHeight * 0.2,
//                   width: "100%",
//                   marginBottom: 20,
//                   borderRadius: 10,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//                 key={index}
//               >
//                 <View
//                   style={{
//                     height: "80%",
//                     width: "40%",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text style={{ fontSize: 17, fontWeight: "400" }}>
//                     {" "}
//                     {item.data.name}
//                   </Text>
//                   <Text>
//                     {new Intl.NumberFormat("de-DE").format(item.price)} VND
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     height: "80%",
//                     width: "45%",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>Quantity: {item.quantity}</Text>
//                   <Image
//                     source={{ uri: item.image }}
//                     style={{
//                       height: windowHeight * 0.1,
//                       width: "90%",
//                       borderRadius: 2,
//                     }}
//                   ></Image>
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//       {/* Order 2 */}
//       <View
//         style={{
//           width: "100%",
//           flex: 1,
//           justifyContent: "flex-start",
//           alignItems: "center",
//           padding: 20,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "600" }}>Status</Text>
//           <Text>Delivering</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             marginTop: 10,
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "600" }}>#2196F3</Text>
//           <Text>{productMid.length} product</Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             width: "100%",
//             marginTop: 10,
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "500" }}>Total</Text>
//           <Text>{new Intl.NumberFormat("de-DE").format(priceMid)} VND</Text>
//         </View>
//         <View
//           style={{ width: "100%", height: windowHeight * 0.7, marginTop: 30 }}
//         >
//           {productMid.map((item, index) => {
//             return (
//               <View
//                 style={{
//                   borderWidth: 0.5,
//                   borderColor: "#B7B7B7",
//                   height: windowHeight * 0.2,
//                   width: "100%",
//                   marginBottom: 20,
//                   borderRadius: 10,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                 }}
//                 key={index}
//               >
//                 <View
//                   style={{
//                     height: "80%",
//                     width: "40%",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text style={{ fontSize: 17, fontWeight: "400" }}>
//                     {" "}
//                     {item.name}
//                   </Text>
//                   <Text>
//                     {new Intl.NumberFormat("de-DE").format(item.price)} VND
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     height: "80%",
//                     width: "45%",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text>Quantity: {item.quantity}</Text>
//                   <Image
//                     source={{ uri: item.image }}
//                     style={{
//                       height: windowHeight * 0.1,
//                       width: "90%",
//                       borderRadius: 2,
//                     }}
//                   ></Image>
//                 </View>
//               </View>
//             );
//           })}
//         </View>
//       </View>
//     </ScrollView>
//   </View>
// );
import ItemDeliver from "./ItemDeliver";
import getAllOrder from "../../../features/User/getAllOrder";
import { auth } from "../../../firebase";
export default function Delivery() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllOrder().then((order) =>
    {
      setProduct(order);
    })
  }, []);
  return (
    <View style={{ padding: 10, flex:1 }}>
      <FlatList
      data={product}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
     return(
      <>
      <ItemDeliver key={index} status={item.status} total={item.total} id={item.id} dataFood={item.data} address={item.address} windowHeight={windowHeight}/>
     </>
     )
      }}
      />
    </View>
  );
}

