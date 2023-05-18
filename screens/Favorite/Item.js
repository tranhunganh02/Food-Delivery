import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { FAB } from "@rneui/themed";
import a from '../home/a'
<<<<<<< HEAD
=======
import getProductWithNameDoc from '../../features/User/getProductWithNameDoc';
>>>>>>> product
export default function Item({navigation}) {
     const [data, setData] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [loadingVisible, setLoadingVisible] = useState(false);
     const showSuccessFavorite = () => {
          setIsModalVisible(true);
          setLoadingVisible(true);
          setTimeout(() => {
            setLoadingVisible(false);
            setTimeout(() => {
              setIsModalVisible(false);
            }, 1500);
          }, 1000);
        };
<<<<<<< HEAD
     const getData = async () =>{
          setData(a.item[1].product)
     }
     useEffect(()=>{
          getData()
=======
     useEffect(()=>{
      getProductWithNameDoc("favorites")
      .then((products) =>
      {
        setData(products);
      })
>>>>>>> product
     }, [])

     const renderItem = ({item}) => {
          return(
               <>
               <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
<<<<<<< HEAD
                      id: item.key,
=======
                      id: item.id,
>>>>>>> product
                      name: item.name,
                      image: item.image,
                      price: item.price,
                    });
                  }}
                  style={{
                    width: windowWidth * 0.88,
                    marginBottom: 10,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    height: "auto",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: windowHeight * 0.23,
                      width: "100%",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  ></Image>
<<<<<<< HEAD
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
                      4.5
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
                      {"(+25)"}
                    </Text>
                  </View>
=======
>>>>>>> product
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
                      showSuccessFavorite();
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
                        {item.name}
                      </Text>
                      <Text>
                        {new Intl.NumberFormat("de-DE").format(item.price)}đ
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
                        PIZZA
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
               </>
          )
     }

     const renderFoodter = () =>{
          (
               <View style={{marginTop:10, alignItems:'center'}}>
                    <Text>There are no more dishes to display</Text>
               </View>
          )
     }
  return (
     <>
      <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
              {loadingVisible ? (
                <FAB loading visible={loadingVisible} size="large" />
              ) : (
                <>
                  <View style={{
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
                  }}>
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
          data={data}
          renderItem={renderItem}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()}
         showsVerticalScrollIndicator={false}
     />
 </>
  )
}