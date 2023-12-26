
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import tw, { useDeviceContext } from "twrnc";
import { tokenCache } from '../constants/token';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: '(tabs)' };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (<ClerkProvider
    publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    tokenCache={tokenCache}
  >
    <RootLayoutNav />
  </ClerkProvider>)
}

function RootLayoutNav() {
  const router = useRouter();
  useDeviceContext(tw);

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();

      if (!isSignedIn) {
        router.push("/(models)/onboard");
      } else {
        router.push("/(tabs)");
      }
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(models)/onboard" options={{ headerShown: true }} />
    </Stack>
  );
}
