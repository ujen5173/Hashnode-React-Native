import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/Colors";
import { C } from "../contexts/RootContext";
import tw from "../lib/tailwind";
import Icons from "./Icons";

const CommentCard = () => {
  const { themeValue } = useContext(C);

  return (
    <View
      style={tw`border border-slate-300 dark:border-slate-600 rounded-xl my-2`}
    >
      <View style={tw`p-2 flex-row gap-4 justify-between`}>
        <View style={tw`flex-row gap-2 flex-1`}>
          <Image
            source={{
              uri: "https://picsum.photos/200",
            }}
            style={tw`w-12 h-12 mt-2 rounded-full`}
          />
          <View>
            <Text
              style={tw`text-lg font-bold text-slate-900 dark:text-slate-100`}
            >
              Ujen Basi
            </Text>
            <Text style={tw`text-base text-slate-800 dark:text-slate-200`}>
              Full stack developer
            </Text>
            <Text
              style={tw`text-sm font-bold text-slate-600 dark:text-slate-400`}
            >
              Jan 6, 2023
            </Text>
          </View>
        </View>

        <View style={tw`py-2`}>
          <TouchableOpacity activeOpacity={0.9}>
            <Icons.moreVertical
              size={20}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`p-2`}>
        <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, voluptas, quidem.
        </Text>
      </View>
      <View style={tw`p-2 flex-row`}>
        <View
          style={tw`border-r border-slate-300 flex-row gap-2 dark:border-slate-600 px-4 py-2`}
        >
          <Icons.replyLeft
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
          <Text style={tw`text-base text-slate-700 dark:text-slate-300`}>
            Reply
          </Text>
        </View>
        <View style={tw`px-4 py-2`}>
          <Icons.heart
            size={20}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
