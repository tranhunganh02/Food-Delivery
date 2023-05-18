import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { FAB } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const AllProduct = ({ navigation }) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    Loading();
  });
  const Conttainer = React.lazy(() => import("./Item"));
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
      <View style={{ width: "100%", alignItems: "center", height:60, justifyContent:'flex-end' }}>
        <TouchableOpacity style={{position:'absolute', left:10}}
          onPress={()=>{navigation.goBack()}}
        >
          <Ionicons name="chevron-back" size={32} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "400" }}>Your favorite</Text>
      </View>
<<<<<<< HEAD
      <View
=======
      {/* <View
>>>>>>> product
        style={{
          position: "absolute",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FAB
          loading={loading}
          visible={loading}
          icon={{ name: "add", color: "white" }}
          size="large"
        />
<<<<<<< HEAD
      </View>
=======
      </View> */}
>>>>>>> product
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

<<<<<<< HEAD
export default AllProduct;
=======
export default AllProduct;
>>>>>>> product
