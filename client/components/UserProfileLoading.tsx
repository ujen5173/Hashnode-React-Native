import React from 'react'
import { View } from 'react-native'
import tw from '../lib/tailwind'

const UserProfileLoading = () => {
  return (
    <View style={tw`flex-1 bg-slate-100 px-4 py-8 items-center dark:bg-slate-900`}>
      <View style={tw`w-18 h-18 mb-4 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />

      <View style={tw`w-8/12 h-5 mb-6 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />
      <View style={tw`w-11/12 h-5 mb-2 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />
      <View style={tw`w-10/12 h-5 mb-4 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />

      <View style={tw`flex-row gap-4 mb-8`}>
        <View style={tw`flex-1 h-8 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />
        <View style={tw`flex-1 h-8 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto`} />
      </View>

      <View style={tw`w-full h-36 rounded-lg bg-slate-300 dark:bg-slate-700 mx-auto`} />
    </View>
  )
}

export default UserProfileLoading