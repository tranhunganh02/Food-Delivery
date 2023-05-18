import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { FAB } from "@rneui/themed";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const AllProduct = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    Loading();
  });
  const Conttainer = React.lazy(() => import("./item"));
  const Loading = () => {
    setTimeout(() => {
      setloading(false);
    }, 5500);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "400" }}>All Product</Text>
      </View>
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position:'absolute'
        }}
      >
        <FAB
          loading={loading}
          visible={loading}
          icon={{ name: "add", color: "white" }}
          size="small"
        />
      </View> */}
      <Suspense
        fallback={
          <>
            <Text>...Loading</Text>
            {Loading()}
          </>
        }
      >
        <View style={{ height: "95%", width: "95%", marginTop: 10 }}>
          <Conttainer navigation={navigation} />
        </View>
      </Suspense>
    </View>
  );
};

export default AllProduct;
