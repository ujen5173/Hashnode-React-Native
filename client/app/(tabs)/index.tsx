import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Card from "../../components/Card";
import CardLoading from "../../components/CardLoading";
import SemiHeader from "../../components/SemiHeader";
import { serverEndPoint } from "../../constants/url";
import fetchData from "../../helpers/fetch";
import storage from "../../helpers/storage";
import tw from "../../lib/tailwind";

export type Article = {
  _id: string;
  title: string;
  subtitle: string;
  tags: string[];
  content: string;
  cover_image: string;
  cover_image_key: string;
  slug: string;
  read_time: number;
  disabledComments: boolean;
  likesCount: number;
  commentsCount: number;
  readCount: number;
  createdAt: string;
  series: {
    title: string;
    slug: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
};

export enum FeedType {
  MyFeed = "My Feed",
  Following = "Following",
  Recent = "Recent",
}

const HomePage = () => {
  const [feedType, setFeedType] = useState<FeedType>(FeedType.MyFeed);
  const [bookmarks, setBookmarks] = React.useState<string[]>([]);
  const url = `${serverEndPoint}/api/v1/articles?type=${feedType
    .toLowerCase()
    .replace(" ", "-")}`;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["all_articles"],
    queryFn: async () => await fetchData<Article[]>(url),
  });

  useEffect(() => {
    refetch();
  }, [feedType]);

  storage
    .load({
      key: "bookmarks",
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((res) => {
      setBookmarks(res || []);
      return res;
    })
    .catch((err) => {
      if (err.name === "NotFoundError") {
        storage.save({
          key: "bookmarks",
          data: [],
          expires: null,
        });
      }
    });

  return (
    <>
      <View style={tw`bg-slate-100 dark:bg-slate-900 flex-1`}>
        <SemiHeader feedType={feedType} setFeedType={setFeedType} />

        {isFetching ? (
          <View>
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={tw`${
                    index === 2 ? "border-0" : "border-b"
                  } border-slate-300 dark:border-slate-600`}
                >
                  <CardLoading />
                </View>
              ))}
          </View>
        ) : (
          <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={tw`${
                  index === (data?.data ?? []).length - 1
                    ? "border-0"
                    : "border-b"
                } border-slate-300 dark:border-slate-600`}
              >
                <Card bookmarks={bookmarks} article={item} />
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default HomePage;
