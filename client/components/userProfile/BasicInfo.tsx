import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";
import Icons from "../Icons";

const BasicInfo = ({
  data,
}: {
  data: {
    name?: string;
    tagline?: string;
    image?: string;
    followerCount?: number;
    followingCount?: number;
  };
}) => {
  const { themeValue } = useContext(C);

  return (
    <View style={tw`flex-col items-center`}>
      <Image
        style={tw`w-24 h-24 mb-2 rounded-full`}
        source={{
          uri: data?.image,
        }}
        resizeMode="cover"
      />

      <Text
        style={tw`text-slate-800 mb-2 text-2xl font-bold dark:text-slate-100 text-center`}
      >
        {data?.name}
      </Text>
      <Text
        style={tw`text-slate-600 mb-2 text-xl dark:text-slate-300 text-center`}
      >
        {data?.tagline}.
      </Text>

      <View style={tw`flex-row gap-2 mb-4 items-center`}>
        <Text style={tw`text-slate-600 dark:text-slate-400 text-lg`}>
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
            data?.followerCount ?? 0
          )}{" "}
          followers
        </Text>
        <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>•</Text>
        <Text style={tw`text-slate-600 dark:text-slate-400 text-lg`}>
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
            data?.followingCount ?? 0
          )}{" "}
          followings
        </Text>
      </View>

      <View style={tw`flex-row gap-2 mb-4 items-center`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`bg-blue-600 gap-1 border border-blue-600 rounded-full py-2 px-6 flex-row items-center justify-center`}
          >
            <Icons.plus size={16} stroke="none" fill={"#fff"} />
            <Text style={tw`text-white text-base`}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex-1`}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`border border-blue-600 rounded-full py-2 px-6 gap-2 flex-row items-center justify-center`}
          >
            {/* <Share size={18} style={tw`text-blue-600 mr-2`} /> */}
            <Icons.uploadBox size={18} stroke="none" fill={colors.blue[600]} />
            <Text style={tw`text-blue-600 text-base`}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasicInfo;
