import { BookOpen, LineChart } from "lucide-react-native";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { DevArticleCard } from "../app/dev/[userId]";
import formatDate from "../helpers/date";
import tw from "../lib/tailwind";

const DevCard: FC<{
  article: DevArticleCard;
}> = ({ article }) => {
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
              <BookOpen
                size={18}
                style={tw`text-slate-500 dark:text-slate-400`}
              />
              <Text
                style={tw`text-sm font-normal text-slate-500 dark:text-slate-400`}
              >
                {article?.read_time} min read
              </Text>
            </View>
            <View style={tw`flex-row gap-2 items-center`}>
              <LineChart
                size={18}
                style={tw`text-slate-500 dark:text-slate-400`}
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
