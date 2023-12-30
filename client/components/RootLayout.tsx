
import { useAuth } from '@clerk/clerk-expo';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import tw, { useDeviceContext } from "twrnc";
import { serverEndPoint } from '../contants/url';
import { C, User } from '../contexts/RootContext';
import fetchData from '../helpers/fetch';
import useWarmUpBrowser from '../hooks/useWarmUpBrowser';

const RootLayoutNav = () => {
  useWarmUpBrowser();
  useDeviceContext(tw, { withDeviceColorScheme: false });

  const { setUser } = useContext(C);
  const router = useRouter();

  const { userId, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!userId) return;

    void (async () => {
      try {
        const url = `${serverEndPoint}/api/v1/users/${userId}`;
        const userData = await fetchData<User>(url);

        if (userData.error) {
          return;
        }

        setUser(userData.data);
      } catch (err) {
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
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(models)/onboard" options={{ headerShown: false }} />
    </Stack>
  );
}

export default RootLayoutNav;