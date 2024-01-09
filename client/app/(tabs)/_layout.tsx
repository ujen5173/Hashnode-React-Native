import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Link, Tabs } from "expo-router";
import { Home } from "lucide-react-native";
import { useContext } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import Icons from "../../components/Icons";
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
                    ? colors.slate["400"]
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
                    <Icons.pen
                      size={20}
                      stroke="none"
                      fill={
                        themeValue === "dark"
                          ? colors.slate["400"]
                          : colors.slate["600"]
                      }
                    />
                  </TouchableOpacity>
                  <Link href="/notifications" style={tw`rounded-full p-2`}>
                    <Icons.bell
                      size={20}
                      stroke="none"
                      fill={
                        themeValue === "dark"
                          ? colors.slate["400"]
                          : colors.slate["600"]
                      }
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
              <Icons.search
                size={22}
                stroke="none"
                fill={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["400"]
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
              <Icons.bookmarks
                size={22}
                fill="none"
                stroke={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["400"]
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
              <Icons.userProfile
                size={22}
                stroke="none"
                fill={
                  focused
                    ? colors.blue["600"]
                    : themeValue === "dark"
                    ? colors.slate["400"]
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
