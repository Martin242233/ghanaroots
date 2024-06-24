import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const chat = () => {
  return (
    <View>
      <Text>chat</Text>
      <TouchableOpacity
      onPress={()=>{
        router.push('profile')
      }}>
        <Text>TO</Text>
      </TouchableOpacity>
    </View>
  )
}

export default chat