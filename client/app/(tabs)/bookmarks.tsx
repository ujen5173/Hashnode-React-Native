import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Article } from ".";
import Card from "../../components/Card";
import CardLoading from "../../components/CardLoading";
import { serverEndPoint } from "../../constants/url";
import fetchData from "../../helpers/fetch";
import useBookmark from "../../hooks/useBookmark";
import tw from "../../lib/tailwind";

const Bookmarks = () => {
  const bookmarks = useBookmark();
  const url = `${serverEndPoint}/api/v1/articles/multiple`;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () =>
      await fetchData<Article[]>(url, {
        method: "POST",
        data: { ids: bookmarks },
      }),
    enabled: bookmarks.length > 0,
  });

  return (
    <View style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
      {isFetching ? (
        <View>
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={tw`${
                  index === 2 ? "border-0" : "border-b"
                } border-slate-400 dark:border-slate-600`}
              >
                <CardLoading />
              </View>
            ))}
        </View>
      ) : data && (data.data ?? []).length > 0 ? (
        <FlatList
          data={data.data}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={tw`${
                index === (data.data ?? []).length - 1 ? "border-0" : "border-b"
              } border-slate-400 dark:border-slate-600`}
            >
              <Card bookmarks={bookmarks} article={item} />
            </View>
          )}
        />
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-slate-500 dark:text-slate-400`}>
            No bookmarks yet
          </Text>
        </View>
      )}
    </View>
  );
};

export default Bookmarks;
