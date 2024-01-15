import { Link } from "expo-router";
import React, { FC, useContext, useEffect, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Article } from "../../app/(auth)/(tabs)";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { serverEndPoint } from "../../constants/url";
import { C } from "../../contexts/RootContext";
import fetchData from "../../helpers/fetchData";
import storage from "../../helpers/storage";
import useBookmark from "../../hooks/useBookmark";
import tw from "../../lib/tailwind";

const ArticleActions: FC<{
  traslateY: Animated.AnimatedInterpolation<string | number>;
  article: Article | null | undefined;
}> = ({ traslateY, article }) => {
  const { themeValue, user } = useContext(C);
  const bookmarks = useBookmark();
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  useEffect(() => {
    if (!article) return;
    setBookmarkStatus(bookmarks.includes(article._id));
  }, [bookmarks, article]);

  const [liked, setLiked] = useState({
    status: (article?.likes ?? []).length > 0 ? true : false,
    likesCount: article?.likesCount,
  });

  return (
    <Animated.View
      style={[
        tw`absolute bottom-0 left-0 bg-white border-t border-slate-300 dark:border-slate-600 dark:bg-slate-800 w-full px-4 pt-1 pb-4`,
        {
          transform: [{ translateY: traslateY }],
        },
      ]}
    >
      <View style={tw`flex-row gap-2`}>
        <Pressable style={tw`px-4 py-2 flex-1`}>
          <Icons.bulletList
            size={22}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </Pressable>
        <Pressable
          style={tw`px-4 py-2 flex-1 flex-row gap-2 items-center`}
          onPress={async () => {
            setLiked({
              ...liked,
              status: !liked.status,
              likesCount: liked.status
                ? (liked.likesCount ?? 0) - 1
                : (liked.likesCount ?? 0) + 1,
            });

            try {
              const url = `${serverEndPoint}/api/v1/articles/like/${article?.slug}`;
              await fetchData(url, {
                method: "PUT",
                data: {
                  sessionUser: user?._id,
                },
              });
            } catch (error) {
              console.log({ error });
            }
          }}
        >
          <Icons.heart
            size={20}
            fill={liked.status ? colors.red["500"] : "none"}
            stroke={
              liked.status
                ? colors.red["500"]
                : themeValue === "dark"
                ? colors.slate["400"]
                : colors.slate["600"]
            }
          />
          <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
            {liked?.likesCount ?? 0}
          </Text>
        </Pressable>
        <Link
          href={{
            pathname: `/models/comment/`,
            params: {
              title: article?.title || "",
              slug: article?.slug || "",
            },
          }}
          asChild
        >
          <Pressable style={tw`px-4 py-2 flex-1 flex-row gap-2 items-center`}>
            <Icons.singleComment
              size={22}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
              {article?.commentsCount}
            </Text>
          </Pressable>
        </Link>
        <Pressable
          onPress={() => {
            if (!article) return;
            storage.save({
              key: "bookmarks",
              data: bookmarkStatus
                ? bookmarks.filter((id) => id !== article._id)
                : [...bookmarks, article._id],
              expires: null,
            });
            setBookmarkStatus(!bookmarkStatus);
          }}
          style={tw`px-4 py-2 flex-1`}
        >
          {bookmarkStatus ? (
            <Icons.bookmarkAdded
              size={22}
              fill={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          ) : (
            <Icons.bookmarkAdd
              size={22}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          )}
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default ArticleActions;
