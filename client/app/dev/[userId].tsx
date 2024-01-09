import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DevCard from "../../components/DevCard";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { serverEndPoint } from "../../constants/url";
import { C } from "../../contexts/RootContext";
import fetchData from "../../helpers/fetchData";
import tw from "../../lib/tailwind";

type User = {
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  followersCount: number;
  followingCount: number;
  social: {
    github: string;
    twitter: string;
    website: string;
    youtube: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    stackoverflow: string;
  };
};

const DeveloperProfile = () => {
  const { themeValue } = useContext(C);
  const navigation = useNavigation();
  const { userId } = useLocalSearchParams();
  const url = `${serverEndPoint}/api/v1/users/articles/${userId}`;
  const usersUrl = `${serverEndPoint}/api/v1/users/id/${userId}`;

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await fetchData<User>(usersUrl),
  });

  const { data, isFetching } = useQuery({
    queryKey: ["articles", userId],
    queryFn: async () => await fetchData<DevArticleCard[]>(url),
  });

  const socials: { [key: string]: JSX.Element } = {
    twitter: (
      <Icons.twitter
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    github: (
      <Icons.githubFill
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    website: (
      <Icons.website
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    linkedin: (
      <Icons.linkedin
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    stackoverflow: (
      <Icons.stackoverflow
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    youtube: (
      <Icons.youtube
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    facebook: (
      <Icons.facebook
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
    instagram: (
      <Icons.instagram
        size={20}
        fill="none"
        stroke={
          themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
        }
      />
    ),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
      headerLeft: () => (
        <View style={tw`flex-row gap-2`}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`rounded-full p-2`}
          >
            <Icons.arrowLeft
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
      ),
    });
  }, []);

  return (
    <ScrollView
      style={tw`flex-1 bg-slate-100 dark:bg-slate-900`}
      stickyHeaderIndices={[1]}
    >
      {/* Developer info */}
      <View style={tw`flex-col items-center justify-center px-4 py-6`}>
        <Text
          style={tw`text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200`}
        >
          {userData?.data?.name}'s Blog
        </Text>

        <View style={tw`flex-row gap-2 items-center mb-4`}>
          {userData?.data?.social &&
            Object.entries(userData?.data?.social).map(([key, value]) => {
              if (!value) return null;
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    Linking.openURL(value);
                  }}
                  key={key}
                  style={tw``}
                >
                  {socials[key]}
                </TouchableOpacity>
              );
            })}
        </View>

        <Pressable
          style={tw`px-4 py-2 rounded-full border mb-2 border-blue-600 flex-row gap-2`}
        >
          <Icons.plus
            size={20}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
          <Text style={tw`text-base text-blue-600`}>Follow</Text>
        </Pressable>

        <Text style={tw`text-slate-800 dark:text-slate-300 text-lg font-bold`}>
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(
            userData?.data?.followersCount ?? 0
          )}{" "}
          Followers
        </Text>
      </View>

      {/* Developer navigations */}
      <View
        style={tw`sticky top-0 left-0 w-full border-b border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900`}
      >
        <View style={tw`flex-row gap-2 px-2`}>
          <Pressable
            style={tw`px-4 py-4 border-b-2 border-slate-600 dark:border-slate-300`}
          >
            <Text style={tw`text-slate-700 font-bold dark:text-slate-200`}>
              Home
            </Text>
          </Pressable>
          <Pressable style={tw`px-4 py-4`}>
            <Text style={tw`text-slate-700 font-bold dark:text-slate-200`}>
              Back to my Website
            </Text>
          </Pressable>
        </View>
      </View>

      {/* developer articles */}
      <View>
        {data?.data?.map((article) => (
          <DevCard key={article._id} article={article} />
        ))}
      </View>
    </ScrollView>
  );
};

export default DeveloperProfile;

export type DevArticleCard = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  read_time: number;
  readCount: number;
  cover_image: string;
};
