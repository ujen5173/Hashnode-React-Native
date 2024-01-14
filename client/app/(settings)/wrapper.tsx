import { router, useNavigation } from "expo-router";
import React, { useContext, useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";

const SettingsProvider = () => {
  const { themeValue } = useContext(C);
  const navigation = useNavigation();

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

  return (
    <View style={tw`flex-1 bg-white dark:bg-slate-900`}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(settings)/profile",
          })
        }
        style={tw`flex-row items-center justify-between p-4 border-b border-slate-300 dark:border-slate-600`}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <Icons.userProfile
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["900"]
            }
          />
          <Text
            style={tw`font-bold text-base text-slate-900 dark:text-slate-100`}
          >
            Profile
          </Text>
        </View>
        <Icons.chevonRight
          size={20}
          fill="none"
          stroke={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(settings)/account",
          })
        }
        style={tw`flex-row items-center justify-between p-4 border-b border-slate-300 dark:border-slate-600`}
      >
        <View style={tw`flex-row items-center gap-2`}>
          <Icons.settings
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["900"]
            }
          />
          <Text
            style={tw`font-bold text-base text-slate-900 dark:text-slate-100`}
          >
            Account
          </Text>
        </View>
        <Icons.chevonRight
          size={20}
          fill="none"
          stroke={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      </Pressable>
    </View>
  );
};

export default SettingsProvider;
