import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import tw, { useDeviceContext } from "twrnc";
import CustomSplashScreen from "../components/CustomSplashScreen";
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

const queryClient = new QueryClient();

const RootLayoutNav = () => {
  useWarmUpBrowser();
  useDeviceContext(tw, { withDeviceColorScheme: false });

  return (
    <View style={tw`bg-white dark:bg-slate-900 flex-1`}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <ToastProvider offset={50} placement="bottom">
          <RootContext>
            <QueryClientProvider client={queryClient}>
              <InitialLayout />
            </QueryClientProvider>
          </RootContext>
        </ToastProvider>
      </ClerkProvider>
    </View>
  );
};

export default RootLayoutNav;

const InitialLayout = () => {
  const { setUser, themeValue } = useContext(C);

  const toast = useToast();
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [removeSplashScreen, setRemoveSplashScreen] = useState(false);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    if (isLoaded) {
      tm = setTimeout(() => {
        setRemoveSplashScreen(true);
      }, 595);

      return () => {
        setRemoveSplashScreen(false);
        clearTimeout(tm);
      };
    }
  }, [isLoaded]);

  useLayoutEffect(() => {
    if (!userId) return;

    void (async () => {
      try {
        const url = `${serverEndPoint}/api/v1/users/clerk/id/${userId}`;
        const userData = await fetchData<User>(url);

        if (userData.error) {
          toast.show(userData.error || "Failed to login.");
        }

        setUser(userData.data);
      } catch (err) {
        console.log({ err });
        toast.show("Failed to login.");
      }
    })();
  }, [userId]);

  return (
    <>
      {!removeSplashScreen ? (
        <View style={tw`z-50 absolute top-0 left-0 flex-1`}>
          <CustomSplashScreen isLoaded={isLoaded} />
        </View>
      ) : null}
      <Slot />
      <StatusBar
        barStyle={themeValue === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
};
