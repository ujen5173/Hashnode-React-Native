import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Link, Tabs } from "expo-router";
import {
  Bell,
  Bookmark,
  CircleUserRound,
  Home,
  Pencil,
  Search,
} from "lucide-react-native";
import { useContext } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";

export default function TabLayout() {
  const { themeValue } = useContext(C);

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: tw`shadow-xl`,
          tabBarStyle: tw`border-t border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900`,
        }}
      >
        {[
          {
            label: "index",
            icon: ({ focused }: { focused: boolean }) => (
              <Home
                size={22}
                color={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
            ),
            headerOptions: {
              headerRight: () => (
                <View style={tw`flex-row gap-2 px-4`}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={tw`rounded-full p-2`}
                  >
                    <Pencil
                      size={20}
                      style={tw`text-slate-700 dark:text-slate-200`}
                    />
                  </TouchableOpacity>
                  <Link href="/notifications" style={tw`rounded-full p-2`}>
                    <Bell
                      size={20}
                      style={tw`text-slate-700 dark:text-slate-200`}
                    />
                  </Link>
                </View>
              ),
              headerTitle: () => (
                <Text
                  style={tw`text-slate-900 dark:text-white text-lg font-bold`}
                >
                  My Feed
                </Text>
              ),
            },
          },
          {
            label: "search",
            icon: ({ focused }: { focused: boolean }) => (
              <Search
                size={22}
                color={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
            ),
            headerOptions: {
              headerTitle: () => (
                <Text
                  style={tw`text-slate-900 dark:text-white text-lg font-bold`}
                >
                  Search
                </Text>
              ),
            },
          },
          {
            label: "bookmarks",
            icon: ({ focused }: { focused: boolean }) => (
              <Bookmark
                size={22}
                color={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
            ),
            headerOptions: {
              headerTitle: () => (
                <Text
                  style={tw`text-slate-900 dark:text-white text-lg font-bold`}
                >
                  Bookmarks
                </Text>
              ),
            },
          },
          {
            label: "profile",
            icon: ({ focused }: { focused: boolean }) => (
              <CircleUserRound
                size={22}
                color={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
            ),
            headerOptions: {
              headerTitle: () => (
                <Text
                  style={tw`text-slate-900 dark:text-white text-lg font-bold`}
                >
                  Profile
                </Text>
              ),
            },
          },
        ].map((screen, i) => (
          <Tabs.Screen
            key={i}
            name={screen.label}
            options={{
              tabBarShowLabel: false,
              unmountOnBlur: true,
              headerStyle: tw`bg-white dark:bg-slate-900`,
              ...screen.headerOptions,
              tabBarIcon: ({ focused }) =>
                screen.icon({
                  focused,
                }),
            }}
          />
        ))}
      </Tabs>
      <StatusBar
        barStyle={themeValue === "dark" ? "light-content" : "dark-content"}
      />
    </BottomSheetModalProvider>
  );
}
