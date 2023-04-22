
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import React, {useRef, useState} from 'react';
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const category = [
                {name: 'Cafe', id: '1',},
                {name: 'Milk tea', id: '2',},
                {name: 'Breakfast', id: '3',},
                {name: 'Lunch tea', id: '4',},
                {name: 'Dinner', id: '5',},
                {name: 'Smoothies/Juices', id: '6'},
                {name: 'Snacks', id: '7',},
                {name: 'Noodles', id: '8',},
              ];
const AddFood = ({navigation}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePicker, setImagePicker] = useState("");
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(category);
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchRef = useRef();
  const onSearch = search => {
    if (search !== '') {
      let tempData = data.filter(item => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(category);
    }
  };
  return (
    <SafeAreaView style={{
       flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,}}>
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
        <Text>Add food</Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={() => {
            ex()
          }}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{flex:1, 
                    justifyContent:'flex-start',
                    alignItems:'center',
                    height:windowHeight*0.3, 
                    width:windowWidth,
                    marginTop:20,
                  }}>
      <TextInput
        style={styles.input}
        placeholder="Food name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(number) => (setPrice(number))}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <Text>Choose image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{fontWeight:'600'}}>
          {selectedCategory == '' ? 'Select category' : selectedCategory}
        </Text>
        {clicked ? (
          <Image
            source={require('../../../assets/icon/upload.png')}
            style={{width: 20, height: 20}}
          />
        ) : (
          <Image
            source={require('../../../assets/icon/dropdown.png')}
            style={{width: 20, height: 20}}
          />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 10,
            height: 180,
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#fff',
            borderRadius: 10,
            position:'absolute'
          }}>
          <TextInput
            placeholder="Search.."
            value={search}
            ref={searchRef}
            onChangeText={txt => {
              onSearch(txt);
              setSearch(txt);
            }}
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              borderWidth: 0.2,
              borderColor: '#8e8e8e',
              borderRadius: 7,
              marginTop: 20,
              paddingLeft: 20,
            }}
          />

          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setSelectedCategory(item.name);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '600'}}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          width:'80%',
          height:50,
          backgroundColor:'#00CC00',
          borderRadius:10,
          justifyContent: 'center',
          alignItems:'center',
          marginTop:100
        }}
      >
        <Text style={{
          color:'#fff',
          fontSize:20
        }}>Insert</Text>
      </TouchableOpacity>
      </View>
      <View
        style={styles.showImage}
      >
        <Image
        style={{
          width:"100%",
          height:'100%',
        }}
          source={{uri:'https://c0.wallpaperflare.com/preview/879/772/974/coca-cola-the-coca-cola-company-bottle-drink.jpg'}}
        ></Image>
      </View>
    </SafeAreaView>
  );
};
const styles =  StyleSheet.create({
  headerContainer: {
    height: windowHeight * 0.08,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal:25
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: windowWidth * 0.127,
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
   input: {
    width: "80%",
    padding: 10,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft:15,
    borderWidth:1
  },
  showImage:{
    width:windowWidth*0.5,
    height:windowHeight*0.3,
    position: "absolute",
    bottom:0
  }
})
export default AddFood;