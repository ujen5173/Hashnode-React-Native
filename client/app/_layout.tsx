import { ClerkProvider } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { View } from "react-native";
import RootLayoutNav from "../components/RootLayout";
import RootContext from "../contexts/RootContext";
import { tokenCache } from "../helpers/token";
import tw from "../lib/tailwind";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";
// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: "(tabs)" };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <View style={tw`bg-white dark:bg-slate-900 flex-1`}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <RootContext>
          <QueryClientProvider client={queryClient}>
            <RootLayoutNav />
          </QueryClientProvider>
        </RootContext>
      </ClerkProvider>
    </View>
  );
}
