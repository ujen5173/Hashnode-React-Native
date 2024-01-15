import { router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { FC, useContext, useEffect, useState } from "react";
import { Animated, Dimensions, StatusBar, View } from "react-native";
import { colors } from "../constants/Colors";
import { C } from "../contexts/RootContext";

SplashScreen.preventAutoHideAsync();

const CustomSplashScreen: FC<{
  isLoaded: boolean;
}> = ({ isLoaded }) => {
  const { width, height } = Dimensions.get("window");
  const segments = useSegments();
  const [animateLogo, setAnimateLogo] = useState(false);
  const imageScale = new Animated.Value(1);
  const { themeValue, user } = useContext(C);

  useEffect(() => {
    let tm: NodeJS.Timeout;
    void (async () => {
      if (!isLoaded) return;

      const inTabsGroup = segments[0] === "(auth)";
      setAnimateLogo(true);
      tm = setTimeout(() => {
        if (user && !inTabsGroup) {
          router.replace("/(auth)/(tabs)/");
        } else if (!user) {
          router.replace("/(public)/onboard");
        }

        setAnimateLogo(false);
        SplashScreen.hideAsync();
      }, 1500);
    })();

    return () => {
      setAnimateLogo(true);
      if (!tm) return;
      clearTimeout(tm);
    };
  }, [user]);

  useEffect(() => {
    if (animateLogo) {
      Animated.timing(imageScale, {
        toValue: 15,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [animateLogo]);

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themeValue === "dark" ? colors.slate["900"] : "#fff",
      }}
    >
      <Animated.Image
        source={require("../assets/images/icon.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          transform: [
            {
              scale: imageScale,
            },
          ],
        }}
      />
      <StatusBar
        barStyle={themeValue === "dark" ? "light-content" : "dark-content"}
      />
    </View>
  );
};

export default CustomSplashScreen;
