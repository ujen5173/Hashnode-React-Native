import React from 'react'
import { Text, View } from 'react-native'
import tw from '../../lib/tailwind'

const Bookmarks = () => {
  return (
    <View style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
      <Text style={tw`text-slate-700 dark:text-slate-200`}>
        Bookmarks</Text>
    </View>
  )
}

export default Bookmarks