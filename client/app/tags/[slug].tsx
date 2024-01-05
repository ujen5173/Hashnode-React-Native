import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { Pressable, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Article, } from "../(tabs)";
import Card from "../../components/Card";
import TagsInfoHeader from "../../components/tags/info";
import { serverEndPoint } from "../../constants/url";
import fetchData from "../../helpers/fetch";
import useBookmark from "../../hooks/useBookmark";
import tw from "../../lib/tailwind";

const TagPage = () => {
  const navigation = useNavigation();
  const bookmarks = useBookmark();
  const { slug } = useLocalSearchParams();

  const url = `${serverEndPoint}/api/v1/articles/tag/${slug}`;

  const { data, } = useQuery({
    queryKey: ["tags_articles", slug],
    queryFn: async () => await fetchData<Article[]>(url),
    enabled: !!slug
  });

  if (!data) return null;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: slug,
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

  return (
    <View style={tw`bg-slate-100 flex-1 dark:bg-slate-900`}>
      <TagsInfoHeader />

      <FlatList
        data={data?.data}
        renderItem={({ item }) => (
          <View
            style={tw`border-b border-slate-300 dark:border-slate-600 last:border-0`}
          >
            <Card
              bookmarks={bookmarks}
              key={item._id}
              article={item}
            />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
};

export default TagPage;
