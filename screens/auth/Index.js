import { Animated, Easing, SafeAreaView, View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Tab = createMaterialTopTabNavigator();
const width = Dimensions.get('window').width;
const authUser = auth;
const Index = ({navigation}) => {
         const rotateValue = useRef(new Animated.Value(0)).current;

         useEffect(() => {
           Animated.loop(
             Animated.timing(rotateValue, {
               toValue: 1,
               duration: 2000,
               easing: Easing.linear,
               useNativeDriver: true,
             })
           ).start();
         }, []);
       
         const rotate = rotateValue.interpolate({
           inputRange: [0, 1],
           outputRange: ['0deg', '360deg'],
         });
  useLayoutEffect (() => {
    navigation.setOptions({
      headerShown: false
    })
  })
  return (
    <SafeAreaView style={{flex:1,}}>
        <View style={styles.header}>
            <Image style={{height:250}} source={require('../../assets/Logo/Header-Auth.png')}/>
            <Animated.View style={[styles.pizzaContainer, {position:'absolute', transform: [{ rotate }] }]}>
                  <Image source={require('../../assets/Logo/pizza-deliver.png')} style={styles.pizza} />
            </Animated.View>
        </View>
        <Tab.Navigator>
            <Tab.Screen name="Sign In" component={SignIn} />
            <Tab.Screen name="Sign Up" component={SignUp} />
        </Tab.Navigator>
    </SafeAreaView>
  )
}
function SignIn( { navigation } ) {
  const [hiddenPass, setHiddenPass] = useState(true);
  const [getEmail, setEmail] = useState('');
  const [getPass, setPass] = useState('');

  const validate = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(getEmail)) {
        alert("Invalid email");
        return false;
    } else if (getPass.length < 8) {
        alert("Passwords do not match");
      return false;
    }
    else handleSignIn(getEmail, getPass);
  }

  const handleSignIn = (email, pass) => {
    signInWithEmailAndPassword(authUser, email, pass)
    .then((userCredential) => {
      navigation.navigate("Home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  } 
    return (
     <View style={[{flex:1},styles.component]}>
      <View >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
        keyboardVerticalOffset={70}>
        <View style={[styles.componentTop,]}>
          <Text style={{fontSize:30}}>Login in your account</Text>
          {/* Email */}
          <View style={styles.input}>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getEmail} 
                      onChangeText={(text) => setEmail(text)} 
                      placeholder='Email'/>
          </View>  
          {/* Password */}
          <View style={styles.input}>
            <TextInput style={styles.inputText} 
                      value={getPass}
                      onChangeText={(text) => setPass(text)} 
                      secureTextEntry={hiddenPass? true : false}
                      autoCapitalize={false}
                      placeholder='Password'/>
            <TouchableOpacity style={{width:'20%', height:'100%',  justifyContent:'center'}}
                              onPress={() => setHiddenPass(!hiddenPass)}>
              <Image resizeMethod='resize' source={require('../../assets/icon/Hide.png')} style={{left:40}} />
            </TouchableOpacity>
          </View>        
          <View style={{width:'100%', flexDirection:'row', marginTop:20, alignItems:'center',height: '15%'}}>
            <TouchableOpacity style={{position:'absolute', right: 10}}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={validate}>
            <Text style={{color:'white', fontSize:20}}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.componentBottom,{}]}>
          <View style={{width:'100%', height:'20%', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <View style={{height:2, width:'20%', backgroundColor:'black', margin:10}}></View>
            <Text style={{}}>Or Login with</Text>
            <View style={{height:2, width:'20%', backgroundColor:'black', margin:10}}></View>
          </View>
          <View style={{flex:1, flexDirection:'row', width:'100%', height:'80%', justifyContent:'center',alignItems:'center', }}>
            <TouchableOpacity style={styles.social}>
              <Image source={require('../../assets/icon/Facebook.png')}/>
              <Text style={{fontSize:18, fontWeight:'400'}}> FaceBook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.social}>
              <Image source={require('../../assets/icon/Google.png')}/>
              <Text style={{fontSize:18, fontWeight:'400'}}> Google</Text>
            </TouchableOpacity>
          </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      </View>
    )
}
function SignUp({ navigation }) {
  const [getEmail, setEmail] = useState('');
  const [getUserName, setUserName] = useState('');
  const [getPass, setPass] = useState('');
  const [getImgURL, setImgURL] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authUser, getEmail, getPass)
    .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: getUserName, photoURL: getImgURL     
        }
        );
      navigation.navigate("Home");

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });
  }
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : 'height'}
      keyboardVerticalOffset={50}
      style={[{flex:1},styles.component]}>     
        <View style={[styles.componentTop,{height:'65%'}]}>
          <Text style={{fontSize:25, marginBottom:30}} >Creat your account</Text>
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getUserName} 
                      onChangeText={(text) => setUserName(text)} 
                      placeholder='Full name'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getEmail} 
                      onChangeText={(text) => setEmail(text)} 
                      placeholder='Email'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      secureTextEntry={false}
                      value={getPass} 
                      onChangeText={(text) => setPass(text)} 
                      placeholder='Password'/>
          </View> 
          <View style={styles.input}>
            <Image resizeMethod='resize'/>
            <TextInput style={styles.inputText}
                      autoCapitalize={false}
                      value={getImgURL} 
                      onChangeText={(text) => setImgURL(text)} 
                      placeholder='Picture URL (Optinal)'
                      />
          </View> 
        </View>
        <View style={[styles.componentBottom,{}]}>
          <TouchableOpacity 
            style={[styles.actionButton, {height:'25%'}]}
            onPress={handleSignUp}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    header:{
        height:'30%',
        width:width,
        backgroundColor:'#4D8D6E',
        alignItems:'center',
        justifyContent:'center'
    },
    pizzaContainer: {
         width: 200,
         height: 200,
         borderRadius: 100,
         alignItems: 'center',
         justifyContent: 'center',
       },
       pizza: {
         width: 150,
         height: 150,
       },
    component:{
        alignItems:'center',
        justifyContent:'center',
        padding: 35,
    },
    componentTop:{
      height:'60%',
      width: width,
      alignItems:'center',
    },
    componentBottom:{
      height:'35%',
      width:width,
      justifyContent:'center',
      alignItems:'center',
    },
    input:{
      width:'80%', flexDirection:'row',
      padding:10, backgroundColor:'white',
      marginTop:20, alignItems:'center',
      height: '17%'
    },
    inputText:{
      fontSize:20, 
      marginLeft:10, 
      width:'65%',
    },
    actionButton:{
      width:width - 100,
      height:'15%',
      justifyContent:'center', alignItems:'center',
      backgroundColor: '#4D8D6F',
      borderRadius:30
    },
    social:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      width:'45%', height:'40%',
      backgroundColor:'white',
      margin:'2%',
    } 
  })
export default Index