import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";

const ItemDeliver = ({ id, status, total, dataFood, windowHeight,address }) => {
  useEffect(() => {
  });
  return (
    <>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 13,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Time Order</Text>
          <Text>
            {" "}
            {new Date(Number(id)).toDateString()}{" "}
            {new Date(Number(id)).toLocaleTimeString()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 13,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>ID Order</Text>
          <Text>#{id}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 13,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Status</Text>
          <StatusOrder status={status} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 13,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Total</Text>
          <Text>{new Intl.NumberFormat("de-DE").format(total)} VND</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 13,
            flexWrap:'wrap'
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Address</Text>
          <Text>{address} VND</Text>
        </View>
        <View
          style={{ width: "100%", height: windowHeight * 0.25, marginTop: 50 }}
        >
          <View
            style={{
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center',
              borderColor: "#B7B7B7",
              height: 100,
              width: "100%",
              borderBottomWidth:1,
              paddingBottom:5
            }}
          >
               <Text style={{ fontSize: 19, fontWeight: "500", top:-5}}>Product    </Text>
           <View>
           <FlatList
              data={dataFood}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                   <DataFood
                      image={item.image}
                      quantity={item.quantity}
                      index={index}
                    />
                );
              }}
            />
           </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ItemDeliver;

const StatusOrder = ({ status }) => {
  if (status == 0) {
    return (
      <>
        <Text>Unconfirmed</Text>
      </>
    );
  } else if (status == 1) {
    return (
      <>
        <Text>Confirmed</Text>
      </>
    );
  } else if (status == 2) {
    return (
      <>
        <Text>Delivery</Text>
      </>
    );
  }
  
};

const DataFood = ({ image,index, quantity }) => {
  if (index <= 2) {
    return (
     <>
     <View style={{justifyContent:'center', alignItems:'center'}}>
     <Image source={{ uri: image }} style={{ height: 70, width: 50, margin:5 }} />
     <Text>x {quantity}</Text>
     </View>
     </>
    );
  } else if (index == 3)
    return (
      <>
        <Text style={{top:25}}> +More</Text>
      </>
    );
};
