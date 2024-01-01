import { Link } from "expo-router";
import {
  BookOpenText,
  BookmarkMinus,
  BookmarkPlus,
  Heart,
  MessageCircleMore,
} from "lucide-react-native";
import React, { FC } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { Article } from "../app/(tabs)";
import formatDate from "../helpers/date";
import storage from "../helpers/storage";
import tw from "../lib/tailwind";

type CardProps = {
  article: Article;
  bookmarks: string[];
};

const Card: FC<CardProps> = ({ bookmarks, article }) => {
  const { width } = Dimensions.get("window");
  const [hasBookmark, setHasBookmark] = React.useState(false);

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
    <Link href={`/articles/${article.slug}`}>
      <View style={tw`bg-slate-100 flex-1 dark:bg-slate-900 p-4`}>
        <View style={tw`flex-row gap-2 items-center mb-3`}>
          <Image
            style={tw`w-12 h-12 rounded-full`}
            source={{ uri: article.user.image }}
          />

          <View>
            <Text
              style={tw`leading-1 text-slate-800 dark:text-slate-200 text-lg font-bold`}
            >
              {article.user.name}
            </Text>
            <Text style={tw`text-sm text-slate-500 dark:text-slate-400`}>
              {formatDate(article.createdAt)}
            </Text>
          </View>
        </View>

        <View style={tw`mb-4`}>
          <Text
            style={[
              tw`text-slate-800 dark:text-slate-200 text-2xl mb-2 font-bold`,
              {
                width: width - 32,
              },
            ]}
          >
            {article.title}
          </Text>
          <View style={tw`flex-row items-center gap-2 mb-2`}>
            <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
              {article.user.username}.hashnode.dev
            </Text>
            <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
              •
            </Text>
            <View style={tw`flex-row gap-2 items-center`}>
              <BookOpenText style={tw`text-blue-600`} size={16} />
              <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
                {article.readCount} min read
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              tw`text-base text-slate-600 dark:text-slate-400`,
              {
                width: width - 32,
              },
            ]}
          >
            {article.content.slice(0, 255)}
          </Text>
        </View>

        <Image
          style={[
            tw`h-58 rounded-md`,
            {
              width: width - 32,
            },
          ]}
          resizeMode="cover"
          source={{ uri: article.cover_image }}
        />

        <View style={tw`flex-row gap-4 my-4 items-center justify-between`}>
          <View style={tw`flex-row gap-4`}>
            <TouchableOpacity
              style={tw`flex-row items-center gap-1`}
              activeOpacity={0.9}
            >
              <Heart style={tw`text-slate-600 dark:text-slate-400`} size={22} />
              <Text style={tw`text-slate-600 dark:text-slate-400 text-base`}>
                {article.likesCount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row items-center gap-1`}
              activeOpacity={0.9}
            >
              <MessageCircleMore
                style={tw`text-slate-600 dark:text-slate-400`}
                size={22}
              />
              <Text style={tw`text-slate-600 dark:text-slate-400 text-base`}>
                {article.commentsCount}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleBookmark}
            style={tw`flex-row items-center gap-1`}
            activeOpacity={0.9}
          >
            {hasBookmark ? (
              <BookmarkMinus
                style={tw`text-slate-600 dark:text-slate-400`}
                size={22}
              />
            ) : (
              <BookmarkPlus
                style={tw`text-slate-600 dark:text-slate-400`}
                size={22}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row flex-wrap gap-2`}>
          {article.tags.slice(0, 3).map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={tw`border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg`}
              activeOpacity={0.9}
            >
              <Text
                style={tw`text-slate-600 dark:text-slate-400 text-sm font-medium`}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
          {article.tags.length > 3 && (
            <TouchableOpacity
              style={tw`border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg`}
              activeOpacity={0.9}
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
    </Link>
  );
};

export default Card;
