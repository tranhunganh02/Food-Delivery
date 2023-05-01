import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import { AntDesign } from '@expo/vector-icons';
import Item from "./Item";
const windowHeight =Dimensions.get('window').height
export default function ModalOrder({data, total}) {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(()=>{
  },[])
  return (
    <TouchableOpacity style={styles.centeredView}
    onPress={()=>{
      setModalVisible(!modalVisible)
    }}
    >
      <View style={styles.orderContainer}>
        <View style={styles.orderTop}>
            <Text style={{fontSize:17, fontWeight:'400'}}>Home-Barker Street</Text>
            <TouchableOpacity>
            <AntDesign name="right" size={23} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.orderBottom}>
            <View>
            <Text style={{fontSize:14, fontWeight:'400', color:'grey'}}>Product</Text>
              <Text style={{fontSize:16, fontWeight:'500',}}>{data.length} Products</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:14, fontWeight:'400', color:'grey'}}>Order Total </Text>
              <Text>{new Intl.NumberFormat("de-DE").format(total)} VND</Text>
            </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
           <ScrollView
            horizontal={false}
            showsHorizontalScrollIndicator={false}
           >
            <View style={styles.modalView}>
           {data.map((order) => {
              return (
                <Item
                key={order.key}
                  name={order.name}
                  image={order.image}
                  quantity={order.quantity}
                  price={order.price}
                />
              );
            })}
                      </View>
           </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderContainer:{
    width:'90%',
    height:windowHeight*0.15,
    borderWidth:0.5,
    borderColor:'#B0B0B0',
    borderRadius:9,
    padding:15,
    justifyContent:'center',
    alignItems:'center'
  },
  orderTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:'50%',
    width:'100%'
  },
  orderBottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    height:'49%',
    width:'100%'
  }
  ,centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:15,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop:35
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:'60%',
    height:windowHeight*0.08,
    justifyContent:'center'
  },
  buttonClose: {
    backgroundColor: "#BFCBAE",
    marginBottom:50
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
