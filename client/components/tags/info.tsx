import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Newspaper, Plus, Users } from "lucide-react-native";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { serverEndPoint } from "../../constants/url";
import fetchData from "../../helpers/fetch";
import tw from "../../lib/tailwind";

type Tag = {
  _id: string;
  name: string;
  image: string;
  followersCount: number;
  articlesCount: number;
}

const TagsInfoHeader = () => {
  const { slug } = useLocalSearchParams();

  const url = `${serverEndPoint}/api/v1/tags/${slug}`;

  const { data, } = useQuery({
    queryKey: ["tags_data", slug],
    queryFn: async () => await fetchData<Tag>(url),
    enabled: !!slug
  });

  if (!data) return null;

  return (
    <View style={tw`border-b border-slate-300 dark:border-slate-600 px-4 py-6`}>
      <View style={tw`justify-center flex-row gap-2 items-center`}>
        <Image
          style={tw`w-10 h-10 rounded-lg`}
          source={{ uri: data?.data?.image }}
        />

        <Text style={tw`text-slate-900 dark:text-slate-100 text-2xl font-bold`}>
          #{data?.data?.name}
        </Text>
      </View>

      <View style={tw`items-center mb-4`}>
        <TouchableOpacity
          style={tw`flex-row gap-2 border border-blue-600 rounded-full px-4 py-2 mt-4`}
        >
          <Plus size={20} style={tw`text-blue-600`} />
          <Text style={tw`text-blue-600 text-sm font-bold`}>Follow</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`justify-center flex-row gap-2`}>
        <View style={tw`items-center flex-row gap-2`}>
          <Users size={16} style={tw`text-slate-700 dark:text-slate-300`} />

          <Text style={tw`text-slate-700 dark:text-slate-300`}>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(data?.data?.followersCount ?? 0)}{" "}
            followers
          </Text>
        </View>

        <Text style={tw`text-sm text-slate-700 dark:text-slate-300`}>·</Text>

        <View style={tw`flex-row gap-2 items-center`}>
          <Newspaper size={16} style={tw`text-slate-700 dark:text-slate-300`} />

          <Text style={tw`text-slate-700 dark:text-slate-300`}>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(data?.data?.articlesCount ?? 0)}{" "}
            articles
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TagsInfoHeader;