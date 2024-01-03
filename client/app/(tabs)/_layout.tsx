import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
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
          tabBarStyle: {
            borderColor:
              themeValue === "dark" ? colors.slate["500"] : colors.slate["200"],
            backgroundColor:
              themeValue === "dark" ? colors.slate["900"] : colors.slate["100"],
          },
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
                    activeOpacity={0.8}
                    style={tw`rounded-full p-2`}
                  >
                    <Pencil
                      size={20}
                      style={tw`text-slate-700 dark:text-slate-200`}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={tw`rounded-full p-2`}
                  >
                    <Bell
                      size={20}
                      style={tw`text-slate-700 dark:text-slate-200`}
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerTitle: () => (
                <Text style={tw`text-slate-900 dark:text-white text-base`}>
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
                <Text style={tw`text-slate-900 dark:text-white text-base`}>
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
                <Text style={tw`text-slate-900 dark:text-white text-base`}>
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
                <Text style={tw`text-slate-900 dark:text-white text-base`}>
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
              headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
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
