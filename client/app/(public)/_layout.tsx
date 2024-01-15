import { Stack } from "expo-router";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { C } from "../../contexts/RootContext";

const PublicLayout = () => {
  const { themeValue } = useContext(C);

  return (
    <>
      <Stack>
        <Stack.Screen name="onboard" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        barStyle={themeValue === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
};

export default PublicLayout;
