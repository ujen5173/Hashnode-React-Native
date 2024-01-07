import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { MessageCircleMore, X } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommentCard from "../../../components/CommentCard";
import tw from "../../../lib/tailwind";

const Comment = () => {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

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
          <X style={tw`text-slate-900 dark:text-slate-100`} size={22} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={tw`flex-1 bg-white dark:bg-slate-900`}>
      <ScrollView style={tw`flex-1 p-4`}>
        <Text
          style={tw`text-xl font-bold mb-2 text-slate-600 dark:text-slate-100`}
        >
          {title}
        </Text>

        {/* comments area */}
        <CommentCard />
        <CommentCard />
        <View style={tw`mb-8`}>
          <CommentCard />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={tw`border-t border-slate-300 dark:border-slate-600 pt-4`}>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(models)/comment/add",
              params: { id, title },
            });
          }}
        >
          <View
            style={tw`rounded-input flex-row gap-2 items-center bg-slate-100 dark:bg-slate-800 px-4 py-3`}
          >
            <MessageCircleMore
              size={20}
              style={tw`text-slate-700 dark:text-slate-400`}
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
