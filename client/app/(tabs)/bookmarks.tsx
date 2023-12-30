import React from 'react'
import { ScrollView, View } from 'react-native'
import Card from '../../components/Card'
import tw from '../../lib/tailwind'

const Bookmarks = () => {
  return (
    <ScrollView style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
      {["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""].map((e, index) => (
        <View key={index} style={tw`${index === 2 ? "border-0" : "border-b"} border-slate-300 dark:border-slate-600`}>
          <Card />
        </View>
      ))}
    </ScrollView>

  )
}

export default Bookmarks