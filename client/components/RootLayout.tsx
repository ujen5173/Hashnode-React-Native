import { useAuth } from "@clerk/clerk-expo";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useContext, useEffect, useLayoutEffect } from "react";
import tw, { useDeviceContext } from "twrnc";
import { serverEndPoint } from "../constants/url";
import { C, User } from "../contexts/RootContext";
import fetchData from "../helpers/fetchData";
import useWarmUpBrowser from "../hooks/useWarmUpBrowser";

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
        router.push("/onboard");
      } else {
        router.push("/(tabs)");
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(models)/onboard" options={{ headerShown: false }} />
      <Stack.Screen
        name="articles/[slug]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="(user)/[username]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="tags/[slug]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="dev/[userId]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="(models)/comment/index"
        options={{
          animation: "slide_from_bottom",
          headerTitle: "Coments",
        }}
      />
      <Stack.Screen
        name="(models)/comment/add"
        options={{
          animation: "slide_from_bottom",
          headerTitle: "Coments",
        }}
      />
    </Stack>
  );
};

export default RootLayoutNav;
