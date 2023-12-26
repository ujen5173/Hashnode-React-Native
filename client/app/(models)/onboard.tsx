import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw, { useAppColorScheme } from "twrnc";
import useWarmUpBrowser from '../../hooks/useWarmUpBrowser';

const Login = () => {
  useWarmUpBrowser();
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

  return (
    <View style={tw`flex-1 items-center justify-center dark:bg-blue-500`}>
      <Text>Theme: {colorScheme}</Text>
      <TouchableOpacity onPress={toggleColorScheme}>
        <Text style={tw`text-black dark:text-white`}>
          Switch Color Scheme
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login