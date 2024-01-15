import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useContext } from "react";
import { StatusBar } from "react-native";
import { C } from "../../contexts/RootContext";

const AuthLayout = () => {
  const { userId } = useAuth();
  const { themeValue } = useContext(C);

  return (
    <>
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
      <StatusBar
        barStyle={themeValue === "dark" ? "light-content" : "dark-content"}
      />
    </>
  );
};

export default AuthLayout;
