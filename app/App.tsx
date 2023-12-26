import { ClerkProvider, useClerk, useOAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  return (
    <ClerkProvider publishableKey={Constants.expoConfig!.extra!.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView style={styles.container}>
        <ComponentPage />
      </SafeAreaView>
    </ClerkProvider>
  );
}

const ComponentPage = () => {
  const { user } = useClerk();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("http://192.168.1.69:5173/api/v1/articles");
        const result = await res.json();
        console.log({ result });
      } catch (err) {
        console.log({ err })
      }
    })();
  }, []);

  return (
    <View>
      <Text style={{
        marginBottom: 10
      }}>Let's get started!</Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#ef4444",
          borderRadius: 7
        }}

        onPress={async () => {
          try {
            const { createdSessionId, setActive } =
              await startOAuthFlow();
            console.log({ createdSessionId })

            if (createdSessionId) {
              setActive!({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error(`Oauth Error: ${JSON.stringify(err)}`);
          }
        }}>
        <Text style={{
          textAlign: "center",
          color: "#fff"
        }}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
