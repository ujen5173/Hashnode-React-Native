import { Clock, Filter, Newspaper, Star } from 'lucide-react-native';
import React, { useContext, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Card from '../../components/Card';
import { C } from '../../contexts/RootContext';
import tw from '../../lib/tailwind';

const HomePage = () => {
  const { themeValue } = useContext(C);
  console.log({ themeValue });
  return (
    <>
      <ScrollView style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
        <SemiHeader />
        {["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""].map((e, index) => (
          <View key={index} style={tw`${index === 2 ? "border-0" : "border-b"} border-slate-300 dark:border-slate-600`}>
            <Card />
          </View>
        ))}
      </ScrollView>
    </>
  )
}

export default HomePage;

enum FeedType {
  MyFeed = "My Feed",
  Featured = "Featured",
  Recent = "Recent"
}

const SemiHeader = () => {
  const [feedType, setFeedType] = useState<FeedType>(FeedType.MyFeed);

  return (
    <View style={tw`border-t border-b bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-600 flex-row`}>
      <ScrollView horizontal style={tw`border-b border-slate-200 dark:border-slate-500`}>
        {[{
          label: "My Feed",
          icon: <Newspaper size={20} style={tw`${feedType === FeedType.MyFeed ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`} />,
          type: FeedType.MyFeed
        }, {
          label: "Featured",
          icon: <Star size={20} style={tw`${feedType === FeedType.Featured ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`} />,
          type: FeedType.Featured
        }, {
          label: "Recent",
          icon: <Clock size={20} style={tw`${feedType === FeedType.Recent ? "text-blue-600" : "text-slate-500 dark:text-slate-400"}`} />,
          type: FeedType.Recent
        }].map((item, index) => (
          <Pressable key={index} onPress={() => {
            setFeedType(item.type)
          }} style={tw`flex-row flex-1 gap-2 items-center px-2 mx-1 border-b-[3px] ${feedType === item.type ? "border-blue-600" : "border-transparent"} py-4`}>
            {item.icon}
            <Text style={tw`${feedType === item.type ? "text-blue-600" : "text-slate-500 dark:text-slate-400"} text-base`}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={tw`px-4 border-l flex-row items-center border-slate-300 dark:border-slate-600`}>
        <Filter size={20} style={tw`text-slate-500 dark:text-slate-200`} />
      </View>
    </View>
  )
}