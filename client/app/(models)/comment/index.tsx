import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommentCard from "../../../components/CommentCard";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { C } from "../../../contexts/RootContext";
import tw from "../../../lib/tailwind";

const Comment = () => {
  const { title, slug } = useLocalSearchParams();
  const router = useRouter();
  const { themeValue } = useContext(C);

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
              params: { slug, title },
            });
          }}
        >
          <View
            style={tw`rounded-input flex-row gap-2 items-center bg-slate-100 dark:bg-slate-800 px-4 py-3`}
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
