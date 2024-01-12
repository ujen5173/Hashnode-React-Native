import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icons from "../components/Icons";
import CommentCard from "../components/notifications/CommentCard";
import FollowCard from "../components/notifications/FollowCard";
import LikeCard from "../components/notifications/LikeCard";
import NotificationNavigation from "../components/notifications/Navigation";
import { colors } from "../constants/Colors";
import { serverEndPoint } from "../constants/url";
import { C } from "../contexts/RootContext";
import fetchData from "../helpers/fetchData";
import tw from "../lib/tailwind";

export type Notification = {
  _id: string;
  body?: string | null; // This is for comment notification
  type: string | null;
  slug?: string | null;
  title?: string | null;
  articleAuthor?: string | null;
  createdAt: Date;
  from: {
    username: string;
    name: string;
    image: string | null;
  };
};

const Notifications = () => {
  const navigation = useNavigation();
  const { userId } = useAuth();
  const { themeValue } = useContext(C);
  const [activeTab, setActiveTab] = React.useState(0);

  const { data } = useQuery({
    queryKey: [`notifications${activeTab.toString()}`],
    queryFn: async () =>
      await fetchData<Notification[]>(
        `${serverEndPoint}/api/v1/notifications`,
        {
          method: "POST",
          data: {
            userId: userId,
          },
        }
      ),
    enabled: !!userId,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
      headerTitle: "Notifications",
      headerTitleStyle: tw`text-slate-900 dark:text-white`,
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
    <View style={tw`flex-1 bg-slate-100 dark:bg-slate-900`}>
      <NotificationNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View>
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
              } border-slate-400 dark:border-slate-600`}
            >
              {
                {
                  COMMENT: <CommentCard card={item} />,
                  LIKE: <LikeCard card={item} />,
                  FOLLOW: <FollowCard card={item} />,
                  // "MENTION": <MentionCard card={item} />,
                  // "ARTICLE": <ArticleCard card={item} />,
                }[item.type as "COMMENT" | "LIKE" | "FOLLOW"]
              }
            </View>
          )}
        />

        {/* end */}
        <View style={tw`px-4 py-3`}>
          <Text
            style={tw`text-lg font-bold text-slate-900 dark:text-slate-100 text-center`}
          >
            You have reached the end! 👋
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notifications;
