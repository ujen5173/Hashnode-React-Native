import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { Pressable, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Article } from "../(tabs)";
import Card from "../../components/Card";
import TagsInfoHeader from "../../components/tags/info";
import { serverEndPoint } from "../../constants/url";
import fetchData from "../../helpers/fetch";
import useBookmark from "../../hooks/useBookmark";
import tw from "../../lib/tailwind";

export type Tag = {
  _id: string;
  name: string;
  image: string;
  followersCount: number;
  articlesCount: number;
};

const TagPage = () => {
  const navigation = useNavigation();
  const bookmarks = useBookmark();
  const { slug } = useLocalSearchParams();

  const url = `${serverEndPoint}/api/v1/articles/tag/${slug}`;
  const tagInfoUrl = `${serverEndPoint}/api/v1/tags/${slug}`;

  const { data } = useQuery({
    queryKey: ["tags_articles", slug],
    queryFn: async () => await fetchData<Article[]>(url),
    enabled: !!slug,
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tag_info"],
    queryFn: async () => await fetchData<Tag>(tagInfoUrl),
    enabled: !!slug,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: slug,
      headerTitleStyle: tw`text-slate-900 dark:text-slate-100`,
      headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
      headerLeft: () => (
        <View style={tw`flex-row gap-2`}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`rounded-full p-2`}
          >
            <ArrowLeft
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          </Pressable>
        </View>
      ),
    });
  }, []);

  if (!data) return null;

  return (
    <View style={tw`bg-slate-100 flex-1 dark:bg-slate-900`}>
      <TagsInfoHeader data={tagsData?.data ?? undefined} />
      <FlatList
        data={data?.data}
        renderItem={({ item, index }) => (
          <View
            style={tw`${index === (data?.data ?? []).length - 1 ? "border-0" : "border-b"
              } border-slate-400 dark:border-slate-700`}
            key={item._id}
          >
            <Card bookmarks={bookmarks} article={item} />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
};

export default TagPage;
