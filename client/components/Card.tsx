import { BookOpenText, BookmarkPlus, Heart, MessageCircleMore } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind';

const Card = () => {
  return (
    <View style={tw`bg-slate-100 dark:bg-slate-900 p-4`}>
      <View style={tw`flex-row gap-2 items-center mb-3`}>
        <Image style={tw`w-12 h-12 rounded-full`} source={{ uri: 'https://picsum.photos/200/300' }} />

        <View>
          <Text numberOfLines={2} style={tw`w-8/12 text-slate-800 dark:text-slate-200 text-lg font-bold mb-1`}>
            Matija Sosic for Wasp - full-stack with React & Node.js
          </Text>
          <Text style={tw`text-sm text-slate-500 dark:text-slate-400`}>
            Dec 13, 2023
          </Text>
        </View>
      </View>

      <View>
        <Text style={tw`text-slate-800 dark:text-slate-200 text-2xl mb-2 font-bold`}>
          Develop the right thing every time and become a 10x engineer 🏆: The art of writing RFCs 🥋
        </Text>
        <View style={tw`flex-row items-center gap-2 mb-2`}>
          <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
            wasp-lang.hashnode.dev
          </Text>
          <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>•</Text>
          <View style={tw`flex-row gap-2 items-center`}>
            <BookOpenText style={tw`text-blue-600`} size={16} />
            <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
              12 min read
            </Text>
          </View>
        </View>
        <Text numberOfLines={2} style={tw`text-lg text-slate-600 dark:text-slate-400`}>
          Imagin you've been tasked to implement a crucial new feature in the product you're working on. You've been thinking about it for a while and you have a pretty good idea of how it should work. You're excited to get started and you're confident that you can implement it in a way that will make your users happy.
        </Text>
      </View>

      <Image style={tw`w-full h-58 rounded-md mt-3 mb-4`} resizeMode='cover' source={{ uri: 'https://picsum.photos/800/400' }} />

      <View style={tw`flex-row gap-4 items-center justify-between`}>
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity style={tw`flex-row items-center gap-1`} activeOpacity={.9}>
            <Heart style={tw`text-slate-600 dark:text-slate-400`} size={22} />
            <Text style={tw`text-slate-600 dark:text-slate-400 text-base`}>
              35
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center gap-1`} activeOpacity={.9}>
            <MessageCircleMore style={tw`text-slate-600 dark:text-slate-400`} size={22} />
            <Text style={tw`text-slate-600 dark:text-slate-400 text-base`}>
              8
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw`flex-row items-center gap-1`} activeOpacity={.9}>
          <BookmarkPlus style={tw`text-slate-600 dark:text-slate-400`} size={22} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Card;