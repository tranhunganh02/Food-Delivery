import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'

export default function Index() {
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: true,
    });
  })
  return (
    <View>
      <Text>Index</Text>
    </View>
  )
}