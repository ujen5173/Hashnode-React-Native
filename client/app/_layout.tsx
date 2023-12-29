import { ClerkProvider } from "@clerk/clerk-expo";
import { SplashScreen } from "expo-router";
import RootLayoutNav from "../components/RootLayout";
import { tokenCache } from "../constants/token";
import RootContext from "../contexts/RootContext";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: "(tabs)" };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <RootContext>
        <RootLayoutNav />
      </RootContext>
    </ClerkProvider>
  );
}
