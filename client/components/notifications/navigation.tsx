import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";
import Icons from "../Icons";

const NotificationNavigation = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { themeValue } = useContext(C);
  const options = [
    {
      icon: (activeTab: boolean) => (
        <Icons.bell
          size={20}
          stroke="none"
          fill={
            activeTab
              ? colors.blue["600"]
              : themeValue === "dark"
              ? colors.slate["400"]
              : colors.slate["600"]
          }
        />
      ),
      label: "All",
    },
    {
      icon: (activeTab: boolean) => (
        <Icons.singleComment
          fill="none"
          size={20}
          stroke={
            activeTab
              ? colors.blue["600"]
              : themeValue === "dark"
              ? colors.slate["400"]
              : colors.slate["600"]
          }
        />
      ),
      label: "Comments",
    },
    {
      icon: (activeTab: boolean) => (
        <Icons.heart
          size={20}
          fill="none"
          stroke={
            activeTab
              ? colors.blue["600"]
              : themeValue === "dark"
              ? colors.slate["400"]
              : colors.slate["600"]
          }
        />
      ),
      label: "Likes",
    },
    {
      icon: (activeTab: boolean) => (
        <Icons.atSign
          size={20}
          fill="none"
          stroke={
            activeTab
              ? colors.blue["600"]
              : themeValue === "dark"
              ? colors.slate["400"]
              : colors.slate["600"]
          }
        />
      ),
      label: "Mentions",
    },
    {
      icon: (activeTab: boolean) => (
        <Icons.document
          size={20}
          stroke="none"
          fill={
            activeTab
              ? colors.blue["600"]
              : themeValue === "dark"
              ? colors.slate["400"]
              : colors.slate["600"]
          }
        />
      ),
      label: "Articles",
    },
  ];

  return (
    <View>
      <ScrollView
        horizontal
        style={tw`bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-600`}
      >
        {options.map((option, index) => (
          <Pressable
            onPress={() => setActiveTab(index)}
            key={index}
            style={tw`w-28 flex-row items-center justify-center px-2 py-4 mx-2 border-b-[3px] ${
              index === activeTab ? "border-blue-600" : "border-transparent"
            }`}
          >
            {option.icon(activeTab === index)}
            <Text
              style={tw`text-base font-bold  ${
                index === activeTab
                  ? "text-blue-600"
                  : "text-slate-600 dark:text-slate-400"
              } ml-2`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationNavigation;
