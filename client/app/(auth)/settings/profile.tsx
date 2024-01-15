// This file contains components that are not present in another file. Importing a component from the file and placing it inside a ScrollView may result in display issues for the component.

import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { socialmedia } from "../../../constants/links";
import { serverEndPoint } from "../../../constants/url";
import { C } from "../../../contexts/RootContext";
import fetchData from "../../../helpers/fetchData";
import tw from "../../../lib/tailwind";

type User = {
  name: string;
  image: string;
  email: string;
  bio: string;
  available: string;
  tagline: string;
  skills: string;
  location: string;
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
  username: string;
};

// props for BasicInfo, AboutYou, Social, ProfileIdentity
export type Props = {
  socialInputHandles?: (name: keyof User["social"], content: string) => void;
  userData: User;
  themeValue: "dark" | "light" | undefined | null;
  setActive: React.Dispatch<
    React.SetStateAction<
      "BASIC_INFO" | "ABOUT_YOU" | "SOCIAL" | "PROFILE_IDENTITY" | null
    >
  >;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  active: "BASIC_INFO" | "ABOUT_YOU" | "SOCIAL" | "PROFILE_IDENTITY" | null;
};

const Profile = () => {
  const toast = useToast();

  const [active, setActive] = useState<
    "BASIC_INFO" | "ABOUT_YOU" | "SOCIAL" | "PROFILE_IDENTITY" | null
  >(null);
  const { themeValue, user } = useContext(C);
  const [userData, setUserData] = useState<User | null>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const socialInputHandles = (name: keyof User["social"], content: string) => {
    setUserData({
      ...userData,
      // @ts-ignore
      social: { ...userData?.social, [name]: content },
    });
  };

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      fetchData<User>(
        `${serverEndPoint}/api/v1/users/profile?userId=${user?._id}`
      ),
    enabled: !!user,
  });

  useEffect(() => {
    if (data) {
      setUserData(data.data);
    }
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile Settings",
      headerTitleStyle: tw`text-slate-800 dark:text-slate-200 font-bold text-xl`,
      headerStyle: tw`bg-white dark:bg-slate-900`,
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

  if (userData === null) {
    return (
      <View style={tw`flex-1 bg-white dark:bg-slate-900`}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-slate-800 dark:text-slate-200 text-xl`}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white dark:bg-slate-900`}>
      <ScrollView style={tw`flex-1`}>
        <View>
          <View style={tw`mb-4 items-center py-10`}>
            <View style={tw`relative`}>
              <Image
                source={{ uri: userData?.image! }}
                style={tw`w-26 h-26 rounded-full`}
                resizeMode="cover"
              />
              <View style={tw`absolute -bottom-1 -right-1`}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={tw`rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-2`}
                >
                  <Icons.trash
                    size={20}
                    fill={
                      themeValue === "dark"
                        ? colors.slate["100"]
                        : colors.slate["700"]
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={tw`flex-1`}>
            <BasicInfo
              themeValue={themeValue}
              userData={userData}
              setUserData={setUserData}
              active={active}
              setActive={setActive}
              key={3164}
            />
            <AboutYou
              key={231}
              themeValue={themeValue}
              userData={userData}
              setUserData={setUserData}
              active={active}
              setActive={setActive}
            />
            <Social
              socialInputHandles={socialInputHandles}
              userData={userData}
              themeValue={themeValue}
              setUserData={setUserData}
              active={active}
              setActive={setActive}
            />
            <ProfileIdentity
              userData={userData}
              themeValue={themeValue}
              setUserData={setUserData}
              active={active}
              setActive={setActive}
            />
          </View>
        </View>
      </ScrollView>

      <View style={tw`p-3`}>
        <Pressable
          onPress={async () => {
            setLoading(true);
            const res = await fetchData<User>(
              `${serverEndPoint}/api/v1/users/update?userId=${user?._id}`,
              {
                method: "PUT",
                data: userData,
              }
            );

            if (res.success) {
              toast.show("Profile updated successfully", {
                type: "normal",
              });
            } else {
              toast.show("Something went wrong", {
                type: "normal",
              });
            }
            setLoading(false);
          }}
          style={tw`${
            loading ? "bg-blue-500" : "bg-blue-600"
          } w-full rounded-full py-3`}
        >
          <Text
            style={tw`${
              loading ? "text-slate-200" : "text-white"
            } text-center text-lg font-bold`}
          >
            {loading ? "Updating..." : "Update"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const BasicInfo = ({
  setActive,
  userData,
  setUserData,
  themeValue,
  active,
}: Props) => {
  return (
    <View style={tw`flex-1 w-full`}>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "BASIC_INFO" ? null : "BASIC_INFO"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          Basic Info
        </Text>
        {active !== "BASIC_INFO" ? (
          <Icons.chevonRight
            size={24}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        ) : (
          <Icons.chevonDown
            size={18}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        )}
      </Pressable>
      {active === "BASIC_INFO" && (
        <View style={tw`p-4`}>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Full name
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.name}
              placeholder="Enter your full name"
              onChangeText={(content) => {
                setUserData({ ...userData, name: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Profile Tagline
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.tagline}
              placeholder="Software Engineer @Google"
              onChangeText={(content) => {
                setUserData({ ...userData, tagline: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Location
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.location}
              placeholder="Paris, France"
              onChangeText={(content) => {
                setUserData({ ...userData, location: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

const AboutYou = ({
  setActive,
  userData,
  setUserData,
  themeValue,
  active,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "ABOUT_YOU" ? null : "ABOUT_YOU"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          About you
        </Text>
        {active !== "ABOUT_YOU" ? (
          <Icons.chevonRight
            size={24}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        ) : (
          <Icons.chevonDown
            size={18}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        )}
      </Pressable>

      {active === "ABOUT_YOU" && (
        <View style={tw`p-4`}>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Bio
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              placeholder="Tell us about yourself"
              value={userData?.bio}
              onChangeText={(content) => {
                setUserData({ ...userData, bio: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Available for
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              multiline
              placeholder="I am available for..."
              value={userData?.available}
              onChangeText={(content) => {
                setUserData({ ...userData, available: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Skills
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              placeholder="React, Node, TypeScript"
              value={userData?.skills}
              onChangeText={(content) => {
                setUserData({ ...userData, skills: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};
const ProfileIdentity = ({
  setActive,
  userData,
  setUserData,
  themeValue,
  active,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setActive((prev) =>
            prev === "PROFILE_IDENTITY" ? null : "PROFILE_IDENTITY"
          );
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          Profile Identity
        </Text>
        {active !== "PROFILE_IDENTITY" ? (
          <Icons.chevonRight
            size={24}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        ) : (
          <Icons.chevonDown
            size={18}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        )}
      </Pressable>
      {active === "PROFILE_IDENTITY" && (
        <View style={tw`p-4`}>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Username
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.username}
              placeholder="@username"
              onChangeText={(content) => {
                setUserData({ ...userData, username: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Email Address
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              placeholder="johndoe@example.com"
              value={userData?.email}
              onChangeText={(content) => {
                setUserData({ ...userData, email: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};
const Social = ({
  setActive,
  socialInputHandles,
  userData,
  themeValue,
  active,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "SOCIAL" ? null : "SOCIAL"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          Social
        </Text>
        {active !== "SOCIAL" ? (
          <Icons.chevonRight
            size={24}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        ) : (
          <Icons.chevonDown
            size={18}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        )}
      </Pressable>

      {active === "SOCIAL" && (
        <View style={tw`p-4`}>
          {socialmedia.map((social) => (
            <View key={social.label} style={tw`my-3`}>
              <Text
                style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
              >
                {social.name}
              </Text>
              <TextInput
                style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
                value={userData?.social[social.label]}
                placeholder={social.placeholder}
                onChangeText={(content) => {
                  socialInputHandles!(social.label, content);
                }}
                placeholderTextColor={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["500"]
                }
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
