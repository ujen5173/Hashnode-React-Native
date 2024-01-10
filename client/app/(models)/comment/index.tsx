import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CommentCard from "../../../components/CommentCard";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { serverEndPoint } from "../../../constants/url";
import { C } from "../../../contexts/RootContext";
import useFetch from "../../../hooks/useFetch";
import tw from "../../../lib/tailwind";

type CommentType = {
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
  parent: string;
  likesCount: number;
};

const Comment = () => {
  const { title, slug } = useLocalSearchParams();
  const router = useRouter();
  const { themeValue } = useContext(C);

  const { data } = useFetch<CommentType[]>({
    queryName: "comment",
    url: `${serverEndPoint}/api/v1/comment/${slug}`,
    requireAuth: true,
    enabled: true,
  });

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-white dark:bg-slate-900`,
      headerTitleStyle: tw`text-slate-900 dark:text-slate-100`,
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            router.back();
          }}
          style={tw`mr-2`}
        >
          <Icons.times
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={tw`flex-1 p-4 bg-white dark:bg-slate-900`}>
      <Text
        style={tw`text-xl font-bold mb-2 text-slate-600 dark:text-slate-100`}
      >
        {title}
      </Text>

      <FlatList
        data={data?.data}
        renderItem={({ item }) => <CommentCard comment={item} />}
        keyExtractor={(item) => item._id}
      />

      {/* Footer */}
      <View style={tw`border-t border-slate-300 dark:border-slate-600 pt-4`}>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(models)/comment/add",
              params: { slug, title },
            });
          }}
        >
          <View
            style={tw`border border-slate-300 dark:border-slate-600 rounded-full flex-row gap-2 items-center bg-slate-100 dark:bg-slate-800 px-4 py-3`}
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
            <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
              Write a comment
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Comment;
