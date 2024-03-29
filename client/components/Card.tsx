import { Link } from "expo-router";
import React, { FC, useContext } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Article } from "../app/(auth)/(tabs)";
import { colors } from "../constants/Colors";
import { C } from "../contexts/RootContext";
import formatDate from "../helpers/date";
import storage from "../helpers/storage";
import tw from "../lib/tailwind";
import Icons from "./Icons";

type CardProps = {
  article: Article;
  bookmarks: string[];
};

const Card: FC<CardProps> = ({ bookmarks, article }) => {
  const { themeValue } = useContext(C);
  const { width } = Dimensions.get("window");
  const [hasBookmark, setHasBookmark] = React.useState(
    bookmarks.includes(article._id)
  );
  const { content: _, ...rest } = article;
  const handleBookmark = async () => {
    storage.save({
      key: "bookmarks",
      data: hasBookmark
        ? bookmarks.filter((id) => id !== article._id)
        : [...bookmarks, article._id],
      expires: null,
    });
    setHasBookmark(!hasBookmark);
  };

  return (
    <View style={tw`bg-white flex-1 dark:bg-slate-900 p-4`}>
      <View style={tw`flex-row gap-2 items-center mb-3`}>
        <View>
          <Link href={`/user/eva_j`}>
            <View>
              <Image
                style={tw`w-12 h-12 rounded-full`}
                source={{ uri: article.user.image }}
              />
            </View>
          </Link>
        </View>

        <View>
          <Link href={`/user/eva_j`}>
            <Text
              style={tw`leading-1 text-slate-800 dark:text-slate-200 text-lg font-bold`}
            >
              {article.user.name}
            </Text>
          </Link>

          <Text style={tw`text-sm text-slate-500 dark:text-slate-400`}>
            {formatDate(article.createdAt)}
          </Text>
        </View>
      </View>

      <View style={tw`mb-4`}>
        <Link
          href={`/articles/${article.slug}`}
          numberOfLines={2}
          style={[
            {
              width: width - 42,
            },
          ]}
          ellipsizeMode="tail"
        >
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              tw`text-slate-800 dark:text-slate-200 text-2xl font-bold`,
              {
                width: width - 42,
              },
            ]}
          >
            {article.title}
          </Text>
        </Link>

        <View style={tw`flex-row items-center gap-2 mt-2 mb-3`}>
          <Link href={`/articles/${article.slug}`}>
            <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
              {/* {article.ueva_jde.dev */}
            </Text>
          </Link>
          <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>•</Text>
          <View style={tw`flex-row gap-1 items-center`}>
            <Icons.bookOpen size={16} fill={colors.blue["600"]} />
            <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
              {article.read_time} min read
            </Text>
          </View>
        </View>

        <View>
          <Link
            href={`/articles/${article.slug}`}
            style={[
              tw`text-slate-700 dark:text-slate-300`,
              {
                width: width - 32,
              },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {article.content}
          </Link>
        </View>
      </View>

      <Link href={`/articles/${article.slug}`}>
        <View style={tw`w-full h-50`}>
          <Image
            style={[
              tw`h-50 rounded-md`,
              {
                width: width - 32,
              },
            ]}
            resizeMode="cover"
            source={{ uri: article.cover_image }}
          />
        </View>
      </Link>

      <View style={tw`flex-row gap-4 my-4 items-center justify-between`}>
        <View style={tw`flex-row gap-4`}>
          <TouchableOpacity
            style={tw`flex-row items-center gap-2`}
            activeOpacity={0.7}
          >
            <Icons.heart
              size={20}
              fill={
                (article?.likes ?? []).length > 0 ? colors.red["500"] : "none"
              }
              stroke={
                (article?.likes ?? []).length > 0
                  ? colors.red["500"]
                  : themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <Text style={tw`text-slate-600 dark:text-slate-400 text-lg`}>
              {article.likesCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center gap-2`}
            activeOpacity={0.7}
          >
            <Icons.singleComment
              size={20}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <Text style={tw`text-slate-600 dark:text-slate-400 text-base`}>
              {article.commentsCount}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleBookmark}
          style={tw`flex-row items-center gap-2`}
          activeOpacity={0.7}
        >
          {hasBookmark ? (
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
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row flex-wrap gap-2`}>
        {article.tags.slice(0, 3).map((tag, index) => (
          <Link
            href={`/tags/${tag}`}
            key={index}
            style={tw`border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg`}
          >
            <Text
              style={tw`text-slate-600 dark:text-slate-400 text-sm font-medium`}
            >
              {tag}
            </Text>
          </Link>
        ))}

        {article.tags.length > 3 && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg`}
          >
            <Text
              style={tw`text-slate-600 dark:text-slate-400 text-sm font-medium`}
            >
              +{article.tags.length - 3}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Card;
