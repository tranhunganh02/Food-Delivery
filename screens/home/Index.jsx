import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import {
  Entypo,
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import a from "./a";
import fetchProduct from "../../features/Product/fetchProduct";
import { FAB } from "react-native-elements";
import { useContext } from "react";
import { AppContext } from "../../component/Auth/AuthContext";
import AddFavoriteProduct from "../../features/User/AddFavoriteProduct";
import { ProductContext } from "../../component/Auth/Product";
import getProductFeatured from "../../features/Product/getProductFeatured";
import { CountContext } from "../../component/Auth/QuatityInCart";
import countProduct from "../../features/User/countProductInCart";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function Index({ navigation }) {
  const { products } = useContext(ProductContext);
  const [listNewData, setListNewData] = useState([]);
  const [listFeatured, setListFeatured] = useState([]);
  const { user } = useContext(AppContext);
  const { count } = useContext(CountContext);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchProduct({ limitProduct: 5 });
      setListNewData(data);
    }
    fetchData();
    getProductFeatured().then((data) => {
      setListFeatured(data);
    });
  }, []);
  const [dataFoodSearch, setDataFoodSearch] = useState(products);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [foodSearch, setFoodSearch] = useState("");

  const [searchText, setSearchText] = useState("");
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleFitler = (text) => {
    setSearchText(text);
    const searchArray = products.filter((item) =>
      item.data.name.toLowerCase().includes(text.toLowerCase())
    );
    setDataFoodSearch(searchArray);
  };

  const showSuccessFavorite = async (id) => {
    if (user) {
      setIsModalVisible(true);
      setLoadingVisible(true);
      await AddFavoriteProduct(id);
      setTimeout(() => {
        setLoadingVisible(false);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 500);
      }, 1000);
    } else {
      navigation.navigate("SignIn");
    }
  };
  return (
    <SafeAreaView
      style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
    >
      {/* {productSearching.length > 0 ? (
        <FlatList
          data={productSearching}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.data.name}</Text>
              <Text>{item.data.price}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No products found</Text>
      )} */}

      {/* <SafeAreaView style={{ alignItems: "center", flex: 1, backgroundColor:'#FFFBE9'}}> */}
      <StatusBar barStyle={"dark-content"} />
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#D6DBCF",
            height: windowHeight * 0.12,
            width: windowWidth * 0.9,
            marginBottom: 25,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 25,
            marginTop: 26,
            padding: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Avatar
              size={64}
              rounded
              source={{
                uri: user
                  ? user.image
                    ? user.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3R_8hlZCdl3FOthlfWXOOLlf3Ngqp6sQvtXQhSs&s"
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3R_8hlZCdl3FOthlfWXOOLlf3Ngqp6sQvtXQhSs&s",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 20,
              flex: 3,
              right: -10,
              width: "85%",
            }}
          >
            Welcome back {user ? user.name : ""}! Order food now!!!
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            width: windowWidth * 0.76,
            borderRadius: 20,
            justifyContent: "center",
          }}
        >
          <Feather
            name="search"
            size={28}
            color="black"
            style={{ position: "absolute", left: 10 }}
          />
          <TextInput
            placeholder="What are you craving"
            style={{ left: 45, color: "#3D405B" }}
            // onChangeText={(text) => {
            //   handleSearchText(text);
            // }}
            // value={searchText}
            value={foodSearch}
            onChangeText={(text) => {
              handleFitler(text);
              setFoodSearch(text);
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: -55, width: "auto" }}
            onPress={() => {
              if (user) {
                navigation.navigate("CartDetails");
              } else {
                navigation.navigate("SignIn");
              }
            }}
          >
            <Ionicons name="cart-outline" size={44} color="black" />
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                borderRadius: 35,
                borderColor: "#fff",
                borderWidth: 1,
                width: 22,
                height: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff" }}>{count}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {foodSearch.length > 0 ? (
          <View
            style={{
              marginTop: 10,
              height: windowHeight * 0.25,
              alignSelf: "center",
              width: "95%",
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "relative",
            }}
          >
            <ScrollView>
            {dataFoodSearch.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "85%",
                  alignSelf: "center",
                  height: 80,
                  justifyContent: "center",
                  borderColor: "#8e8e8e",
                  marginBottom:20
                }}
                onPress={() => {
                  // setSelectFood(item.data.name);
                  // setClickedCity(!clickedCity);
                  navigation.navigate("ProductDetails", {
                    id: item.id,
                    name: item.data.name,
                    image: item.data.image,
                    price: item.data.price,
                  });
                  setFoodSearch("")
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems:'center'
                  }}
                >
                  <Image
                    style={{
                      height: 80,
                      width: 135,
                    }}
                    source={{ uri: item.data.image }}
                  />
                  <View>
                    <Text
                      style={{
                        padding: 10,
                        borderColor: "#F56844",
                        borderWidth: 1,
                        borderRadius: 5,
                      }}
                    >
                      {item.data.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => {
                setFoodSearch("");
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
        ) : null}
        <View
          style={{
            height: windowHeight * 0.22,
            width: windowWidth * 0.9,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 32, color: "#3D405B" }}>
              Category
            </Text>
            <TouchableOpacity>
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <View style={styles.centeredView}>
              {loadingVisible ? (
                <FAB loading visible={loadingVisible} size="large" />
              ) : (
                <>
                  <View style={styles.modalView}>
                    <Text>Add your favorite success</Text>
                    <MaterialIcons
                      name="library-add-check"
                      size={35}
                      color="green"
                    />
                  </View>
                </>
              )}
            </View>
          </Modal>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={a.item[0].category}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "auto",
                    borderRadius: 35,
                    width: windowWidth * 0.2,
                    marginRight: 15,
                    backgroundColor: "#fff",
                    height: windowHeight * 0.1255,
                    marginRight: 23.5,
                    padding: 6,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0.2,
                      height: 0.2,
                    },
                    shadowOpacity: 0.1,
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    source={{ uri: item.image }}
                  ></Image>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.43,
            width: windowWidth * 0.9,
            marginTop: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 30, color: "#3D405B" }}>
              New foods
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AllProduct");
              }}
            >
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={listNewData}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      id: item.id,
                      name: item.data.name,
                      image: item.data.image,
                      price: item.data.price,
                    });
                  }}
                  style={{
                    width: windowWidth * 0.7,
                    marginRight: 10,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item.data.image }}
                    style={{
                      height: windowHeight * 0.23,
                      width: "100%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  ></Image>
                  <View
                    style={{
                      position: "absolute",
                      top: 15,
                      left: 20,
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.04,
                      backgroundColor: "#fff",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.star}
                    </Text>
                    <Entypo
                      name="star"
                      size={18}
                      color="#FFDF5C"
                      style={{ top: -1, marginLeft: 3 }}
                    />
                    <Text
                      style={{
                        fontSize: 11,
                        color: "grey",
                      }}
                    >
                      /{item.number > 5 ? "5+" : item.number}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 20,
                      width: windowWidth * 0.09,
                      height: windowHeight * 0.04,
                      backgroundColor: "#FE724C",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      showSuccessFavorite(item.id);
                    }}
                  >
                    <MaterialIcons name="favorite" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: "auto",
                      padding: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        height: 30,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.data.name}
                      </Text>
                      <Text>
                        {new Intl.NumberFormat("de-DE").format(item.data.price)}
                        đ
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: windowWidth * 0.24,
                        height: windowHeight * 0.04,
                        marginTop: 5,
                        backgroundColor: "#F6F6F6",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        shadowColor: "black",
                        shadowOffset: {
                          width: 0.2,
                          height: 0.5,
                        },
                        shadowOpacity: 0.25,
                      }}
                    >
                      <Text
                        style={{
                          color: "#8A8E9B",
                        }}
                      >
                        {item.data.selectedCategory}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            height: windowHeight * 0.43,
            width: windowWidth * 0.9,
            marginTop: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 65,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 30, color: "#3D405B" }}>
              Featured
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AllProduct");
              }}
            >
              <Text style={{ left: -35 }}>View all</Text>
              <AntDesign
                name="arrowright"
                size={24}
                color="#F56844"
                style={{ position: "absolute", right: 5, top: -3 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={listFeatured}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      id: item.id,
                      name: item.data.name,
                      image: item.data.image,
                      price: item.data.price,
                    });
                  }}
                  style={{
                    width: windowWidth * 0.7,
                    marginRight: 10,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item.data.image }}
                    style={{
                      height: windowHeight * 0.23,
                      width: "100%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  ></Image>
                  <View
                    style={{
                      position: "absolute",
                      top: 15,
                      left: 20,
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.04,
                      backgroundColor: "#fff",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {item.star}
                    </Text>
                    <Entypo
                      name="star"
                      size={18}
                      color="#FFDF5C"
                      style={{ top: -1, marginLeft: 3 }}
                    />
                    <Text
                      style={{
                        fontSize: 11,
                        color: "grey",
                      }}
                    >
                      /{item.number > 5 ? "5+" : item.number}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 20,
                      width: windowWidth * 0.09,
                      height: windowHeight * 0.04,
                      backgroundColor: "#FE724C",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      showSuccessFavorite(item.id);
                    }}
                  >
                    <MaterialIcons name="favorite" size={24} color="#fff" />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: "auto",
                      padding: 15,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        height: 30,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        {item.data.name}
                      </Text>
                      <Text>
                        {new Intl.NumberFormat("de-DE").format(item.data.price)}
                        đ
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: windowWidth * 0.24,
                        height: windowHeight * 0.04,
                        marginTop: 5,
                        backgroundColor: "#F6F6F6",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        shadowColor: "black",
                        shadowOffset: {
                          width: 0.2,
                          height: 0.5,
                        },
                        shadowOpacity: 0.25,
                      }}
                    >
                      <Text
                        style={{
                          color: "#8A8E9B",
                        }}
                      >
                        {item.data.selectedCategory}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: windowWidth * 0.7,
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
});
