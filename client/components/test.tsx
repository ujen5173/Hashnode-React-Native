import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useContext, useEffect, useLayoutEffect } from "react";
import { View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import tw, { useDeviceContext } from "twrnc";
import { serverEndPoint } from "../constants/url";
import RootContext, { C, User } from "../contexts/RootContext";
import fetchData from "../helpers/fetchData";
import { tokenCache } from "../helpers/token";
import useWarmUpBrowser from "../hooks/useWarmUpBrowser";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";
// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: "(tabs)" };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayoutNav = () => {
  useWarmUpBrowser();
  useDeviceContext(tw, { withDeviceColorScheme: false });

  const { setUser } = useContext(C);
  const router = useRouter();

  const { userId, isLoaded, isSignedIn } = useAuth();

  useLayoutEffect(() => {
    if (!userId) return;

    void (async () => {
      try {
        const url = `${serverEndPoint}/api/v1/users/clerk/id/${userId}`;
        const userData = await fetchData<User>(url);

        if (userData.error) {
          return;
        }
        setUser(userData.data);
      } catch (err) {
        console.log({ err });
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();

      if (!isSignedIn) {
        router.replace("/(public)/onboard");
      } else {
        router.push("/settings/account");
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={tw`bg-white dark:bg-slate-900 flex-1`}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <ToastProvider offset={50} placement="bottom">
          <RootContext>
            <QueryClientProvider client={queryClient}>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{ headerShown: false }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="articles/[slug]"
                  options={{
                    headerTitle: "",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="user/[username]"
                  options={{
                    headerTitle: "",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="notifications"
                  options={{
                    headerTitle: "",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="tags/[slug]"
                  options={{
                    headerTitle: "",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="dev/[userId]"
                  options={{
                    headerTitle: "",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="models/comment/index"
                  options={{
                    animation: "slide_from_bottom",
                    headerTitle: "Coments",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="models/comment/add"
                  options={{
                    animation: "slide_from_bottom",
                    headerTitle: "Coments",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="settings/wrapper"
                  options={{
                    headerTitle: "Settings",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="settings/profile"
                  options={{
                    headerTitle: "Profile Settings",
                  }}
                  redirect={!userId}
                />
                <Stack.Screen
                  name="settings/account"
                  options={{
                    headerTitle: "Account Settings",
                  }}
                  redirect={!userId}
                />
              </Stack>
            </QueryClientProvider>
          </RootContext>
        </ToastProvider>
      </ClerkProvider>
    </View>
  );
};

export default RootLayoutNav;
