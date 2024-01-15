import React, { FC, useContext } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Tag } from "../../app/(auth)/tags/[slug]";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";
import Icons from "../Icons";

type Props = {
  data: Tag | undefined;
};

const TagsInfoHeader: FC<Props> = ({ data }) => {
  const { themeValue } = useContext(C);
  return (
    <View style={tw`border-b border-slate-300 dark:border-slate-600 px-4 py-6`}>
      <View style={tw`justify-center flex-row gap-2 items-center`}>
        <Image style={tw`w-12 h-12 rounded-md`} source={{ uri: data?.image }} />

        <Text style={tw`text-slate-900 dark:text-slate-100 text-2xl font-bold`}>
          #{data?.name}
        </Text>
      </View>

      <View style={tw`items-center mb-4`}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={tw`flex-row gap-1 items-center border border-blue-600 rounded-full px-4 py-2 mt-4`}
        >
          <Icons.plus size={16} stroke="none" fill={colors.blue["600"]} />
          <Text style={tw`text-blue-600 text-sm font-bold`}>Follow</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`justify-center flex-row gap-2`}>
        <View style={tw`items-center flex-row gap-1`}>
          <Icons.users
            size={16}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />

          <Text style={tw`text-slate-700 dark:text-slate-300`}>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(data?.followersCount ?? 0)}{" "}
            followers
          </Text>
        </View>

        <Text style={tw`text-sm text-slate-700 dark:text-slate-300`}>·</Text>

        <View style={tw`flex-row gap-1 items-center`}>
          {/* <Newspaper size={16} style={tw`text-slate-700 dark:text-slate-300`} /> */}
          <Icons.newspaper
            size={16}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />

          <Text style={tw`text-slate-700 dark:text-slate-300`}>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(data?.articlesCount ?? 0)}{" "}
            articles
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TagsInfoHeader;
