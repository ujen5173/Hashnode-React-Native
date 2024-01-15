import { router } from "expo-router";
import React, { FC, useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../constants/Colors";
import { serverEndPoint } from "../constants/url";
import { C } from "../contexts/RootContext";
import formatDate from "../helpers/date";
import fetchData from "../helpers/fetchData";
import tw from "../lib/tailwind";
import Icons from "./Icons";

type Comment = {
  _id: string;
  user: {
    name: string;
    username: string;
    tagline: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes: string[];
  type: "COMMENT" | "REPLY";
  children: Comment[];
  parent: string;
  likesCount: number;
};

type CommentProps = {
  slug: string | string[];
  parentId: string | null;
  comment: Comment;
  handlePresentModalPress: (commentId: string) => void;
};

const CommentCard: FC<CommentProps> = ({
  parentId,
  slug,
  comment,
  handlePresentModalPress,
}) => {
  const [liked, setLiked] = useState({
    status: (comment.likes ?? []).length > 0 ? true : false,
    likesCount: comment.likesCount,
  });

  const { user, themeValue } = useContext(C);

  const handleLike = async () => {
    setLiked((prev) => ({
      status: !prev.status,
      likesCount: prev.status ? prev.likesCount - 1 : prev.likesCount + 1,
    }));
    const url = `${serverEndPoint}/api/v1/comment/${comment._id}/like`;
    await fetchData(url, {
      method: "PUT",
      data: { userId: user?._id },
    });
  };

  return (
    <View
      style={tw`border border-slate-300 dark:border-slate-600 rounded-xl my-2`}
    >
      <View style={tw`p-3`}>
        <View style={tw` flex-row gap-4 justify-between`}>
          <View style={tw`flex-row gap-2 flex-1`}>
            <Image
              source={{
                uri: comment.user.image,
              }}
              style={tw`w-12 h-12 mt-2 rounded-full`}
            />
            <View>
              <Text
                style={tw`text-lg font-bold text-slate-900 dark:text-slate-100`}
              >
                {comment.user.name}
              </Text>
              <Text style={tw`text-base text-slate-600 dark:text-slate-300`}>
                {comment.user.tagline}
              </Text>
              <Text
                style={tw`text-sm font-bold text-slate-600 dark:text-slate-400`}
              >
                {formatDate(comment.createdAt)}
              </Text>
            </View>
          </View>

          <View style={tw`py-2`}>
            <Pressable
              onPress={() => {
                handlePresentModalPress(comment._id);
              }}
            >
              <Icons.moreVertical
                size={20}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
            </Pressable>
          </View>
        </View>
        <View style={tw`py-2`}>
          <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
            {comment.content}
          </Text>
        </View>
        <View style={tw` flex-row`}>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/models/comment/add",
                params: parentId
                  ? {
                      slug,
                      parentCommentId: parentId,
                      replyUserName: comment.user.name,
                      parentCommentContent: comment.content,
                      type: "REPLY",
                    }
                  : {
                      slug,
                      replyUserName: comment.user.name,
                      parentCommentContent: comment.content,
                      type: "REPLY",
                    },
              });
            }}
            style={tw`border-r border-slate-300 flex-row gap-2 items-center dark:border-slate-600 px-4 py-2`}
          >
            <Icons.replyLeft
              size={16}
              stroke="none"
              fill={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <Text style={tw`text-base text-slate-700 dark:text-slate-300`}>
              Reply
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLike}
            style={tw`px-4 py-2 flex-row gap-2 items-center`}
          >
            <Icons.heart
              size={16}
              fill={liked.status ? colors.red["500"] : "none"}
              stroke={
                liked.status
                  ? colors.red["500"]
                  : themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
              {liked.likesCount}
            </Text>
          </Pressable>
        </View>

        {/* Replies */}
        <FlatList
          data={comment.children}
          renderItem={({ item }) => (
            <CommentCard
              handlePresentModalPress={handlePresentModalPress}
              parentId={parentId}
              slug={slug}
              comment={item}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default CommentCard;
