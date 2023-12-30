import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import Card from '../../components/Card';
import { C } from '../../contexts/RootContext';
import tw from '../../lib/tailwind';

const HomePage = () => {
  const { themeValue } = useContext(C);
  console.log({ themeValue });
  return (
    <ScrollView style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
      {["", "", ""].map((e, index) => (
        <View key={index} style={tw`${index === 2 ? "border-0" : "border-b"} border-slate-200 dark:border-slate-600`}>
          <Card />
        </View>
      ))}
      <View style={tw`h-48`}></View>
    </ScrollView>
  )
}

export default HomePage;
