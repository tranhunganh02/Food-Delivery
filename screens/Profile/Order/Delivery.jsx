import { View, Text, FlatList, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
const windowHeight = Dimensions.get('window').height
import a from '../../home/a'
export default function Delivery() {
     const [product, setProduct] = useState([a.item[0].product])
     useEffect(()=>{
          
     }, [])
  return (
    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', padding:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
               <Text style={{fontSize:20, fontWeight:'600'}}>#2196F3</Text>
               <Text>3 product</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10}}>
               <Text style={{fontSize:20, fontWeight:'500'}}>Total</Text>
               <Text>{new Intl.NumberFormat("de-DE").format(150000)} VND</Text>
          </View>
          <View style={{width:'100%', height:windowHeight*0.7, marginTop:30}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={a.item[1].product}
            renderItem={({ item }) => {
              return (
                <View style={{borderWidth:0.5, borderColor:'#B7B7B7', height:windowHeight*0.2, width:'100%', marginBottom:20, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <View style={{height:'80%', width:'40%', justifyContent:'space-between', alignItems:'center'}}>
                         <Text style={{fontSize:17, fontWeight:'400'}}> {item.name}</Text>
                         <Text>{new Intl.NumberFormat("de-DE").format(item.price)} VND</Text>
                    </View>    
                    <View style={{height:'80%', width:'45%', justifyContent:'space-between', alignItems:'center'}}>
                         <Text>Quantity: {item.quantity}</Text>
                         <Image source={{uri: item.image}} style={{height:windowHeight*0.1, width:'90%', borderRadius:2}}></Image>
                    </View>     
                </View>
              )
               }}
          />
          </View>
    </View>
  )
}
const Item = ({name, quantity, price, image}) =>{
     return(
          <View style={{borderWidth:0.5, borderColor:'grey', height:300, width:'80%'}}>
               <Text>HI</Text>
          </View>
     )
}
