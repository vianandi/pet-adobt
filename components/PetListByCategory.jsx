import { View, Text } from 'react-native'
import React from 'react'
import Category from './Category'

export default function PetListByCategory() {
  return (
    <View style={{
        flex:1,
    }}>
      <Category></Category>
    </View>
  )
}