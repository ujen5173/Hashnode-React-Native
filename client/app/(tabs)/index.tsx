import { Link } from 'expo-router'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { C } from '../../contexts/RootContext'

const HomePage = () => {
  const { user } = useContext(C);
  console.log({ user })
  return (
    <View>
      <Text>HomePage</Text>
      <Link href="/(models)/onboard">Go to Onboard</Link>
    </View>
  )
}

export default HomePage