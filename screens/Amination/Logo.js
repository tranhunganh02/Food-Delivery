import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App({navigation}) {
  const translateY = useRef(new Animated.Value(-150)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
         Animated.timing(translateY, {
                  toValue: 250,
                  duration: 1000,
                  useNativeDriver: true,
         }),
         Animated.parallel([
                  Animated.spring(translateY, {
                  toValue: -10,
                  friction: 10,
                  useNativeDriver: true,
                  }),
         ]),
         Animated.timing(scale, {
                  toValue: 5,
                  duration: 1000,
                  useNativeDriver: true,
         }),
    ]).start();
    setTimeout(() => {
       navigation.navigate('Auth')           
    }, 3200);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY }, { translateX }, { scale }] },
        ]}
      >
           <LinearGradient
                  colors={['#22C7A9', '#22C7A9']}
                  style={styles.gradient}
                  >
                  <View style={styles.logo}>
                           <Icon name="cutlery" size={72} color="#fff" />
                           <Text style={styles.name}>DeliveryEats</Text>
                  </View>
                  </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
         width: 180,
         height: 180,
         borderRadius: 100,
         alignItems: 'center',
         justifyContent: 'center',
       },
       logo: {
         alignItems: 'center',
         justifyContent: 'center',
       },
       name: {
         color: '#fff',
         fontSize: 18,
         fontWeight: 'bold',
       },
});
