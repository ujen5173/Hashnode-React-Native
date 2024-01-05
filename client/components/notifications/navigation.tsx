import { AtSign, Bell, FileText, Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from '../../lib/tailwind';

const NotificationNavigation = ({ activeTab, setActiveTab }: { activeTab: number, setActiveTab: React.Dispatch<React.SetStateAction<number>> }) => {
  const options = [{
    icon: (activeTab: number, index: number) => (<Bell size={20} style={tw`${activeTab === index ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} `} />),
    label: "All",
  }, {
    icon: (activeTab: number, index: number) => (<MessageCircle size={20} style={tw`${activeTab === index ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} `} />),
    label: "Comments",
  }, {
    icon: (activeTab: number, index: number) => (<Heart size={20} style={tw`${activeTab === index ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} `} />),
    label: "Likes",
  }, {
    icon: (activeTab: number, index: number) => (<AtSign size={20} style={tw`${activeTab === index ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} `} />),
    label: "Mentions",
  }, {
    icon: (activeTab: number, index: number) => (<FileText size={20} style={tw`${activeTab === index ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} `} />),
    label: "Articles",
  }];

  return (
    <View>
      <ScrollView horizontal style={tw`bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-600`}>
        {
          options.map((option, index) => (
            <Pressable
              onPress={() => setActiveTab(index)}
              key={index}
              style={tw`w-28 flex-row items-center justify-center px-2 py-4 mx-2 border-b-[3px] ${index === activeTab ? 'border-blue-300 dark:border-blue-600' : 'border-transparent'}`}
            >
              {option.icon(activeTab, index)}
              <Text style={tw`text-base font-bold  ${index === activeTab ? "text-blue-600" : "text-slate-600 dark:text-slate-400"} ml-2`}>{option.label}</Text>
            </Pressable>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default NotificationNavigation;