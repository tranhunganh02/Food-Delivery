import {
     Dimensions,
     StyleSheet,
     Text,
     View,
     TouchableOpacity,
     StatusBar,
     ScrollView,
   } from "react-native";
   import {
     Ionicons,
     Entypo,
     MaterialCommunityIcons,
     AntDesign,
   } from "@expo/vector-icons";
   
   import React, { useEffect, useState } from "react";
   import Item from "./Item";
import fetchProduct from "../../../features/Product/fetchProduct";
  //  import a from '../../home/a.js'
   const windowHeight = Dimensions.get("window").height;
   const windowWidth = Dimensions.get("window").width;

   const List = ({navigation}) => {
    const [listFood, setListFood] = useState([]);
    useEffect(() =>{
      async function fetchData() {
        const data = await fetchProduct();
        setListFood(data);
      }
      fetchData(); 
    },[listFood])
     return (
       <View
         style={{
           flex: 1,
           paddingHorizontal: 20,
           alignItems: "center",
           justifyContent: "space-between",
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
           <Text>List Food</Text>
           <TouchableOpacity
             style={[
               styles.headerButton,
               { justifyContent: "center", alignItems: "center" },
             ]}
             onPress={() => {
               navigation.navigate('AddFood')
             }}
           >
             <AntDesign name="plus" size={24} color="black" />
           </TouchableOpacity>
         </View>
         <ScrollView
         style={{
           height:windowHeight*0.35,
           width:windowWidth*0.85
         }}>
           {listFood.map((item, index) => (
            <Item navigation={navigation} key={index} id={item.id} name={item.data.name} price={item.data.price} image={item.data.image} quantity={item.data.quantity}/>
        ))}
         </ScrollView>
       </View>
     );
   };
   
   export default List;
   
   const styles = StyleSheet.create({
     headerContainer: {
       height: windowHeight * 0.145,
       width: "100%",
       flexDirection: "row",
       justifyContent: "space-between",
       alignItems: "center",
       marginTop: 15,
       paddingHorizontal:10
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
   });
   