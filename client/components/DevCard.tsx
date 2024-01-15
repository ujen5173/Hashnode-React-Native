import React, { FC, useContext } from "react";
import { Image, Text, View } from "react-native";
import { DevArticleCard } from "../app/(auth)/dev/[userId]";
import { colors } from "../constants/Colors";
import { C } from "../contexts/RootContext";
import formatDate from "../helpers/date";
import tw from "../lib/tailwind";
import Icons from "./Icons";

const DevCard: FC<{
  article: DevArticleCard;
}> = ({ article }) => {
  const { themeValue } = useContext(C);

  return (
    <View style={tw`p-4 `}>
      <Image
        source={{ uri: article?.cover_image }}
        style={tw`w-full h-48 mb-4 rounded-lg`}
      />
      <View style={tw``}>
        <Text style={tw`text-xl font-bold text-slate-800 dark:text-slate-200`}>
          {article?.title}
        </Text>
        <View style={tw`gap-4 flex-row justify-between items-center my-2`}>
          <View>
            <Text
              style={tw`text-sm font-normal text-slate-500 dark:text-slate-400`}
            >
              {formatDate(article?.createdAt)}
            </Text>
          </View>
          <Text
            style={tw`text-sm font-normal text-slate-500 dark:text-slate-400`}
          >
            •
          </Text>
          <View style={tw`flex-row gap-4 items-center flex-1`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <Icons.bookOpen
                size={20}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
              <Text
                style={tw`text-sm font-normal text-slate-500 dark:text-slate-400`}
              >
                {article?.read_time} min read
              </Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <Icons.analytics
                size={20}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />

              <Text
                style={tw`text-sm font-normal text-slate-500 dark:text-slate-400`}
              >
                {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                  article?.readCount ?? 0
                )}{" "}
                views
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={tw`text-base text-slate-500 dark:text-slate-400`}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {article?.content}
        </Text>
      </View>
    </View>
  );
};
export default DevCard;
