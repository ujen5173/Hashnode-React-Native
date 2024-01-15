import { useOAuth } from "@clerk/clerk-expo";

import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import useWarmUpBrowser from "../../hooks/useWarmUpBrowser";
import tw from "../../lib/tailwind";

const Login = () => {
  console.log("ONBOARD RENDER");
  useWarmUpBrowser();

  const { themeValue } = useContext(C);
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  return (
    <View
      style={tw`flex-1 items-center justify-center bg-slate-100 dark:bg-slate-900`}
    >
      <View style={tw`h-52`} />
      <View style={tw`mb-12 w-11/12`}>
        <Text
          style={tw`text-slate-900 dark:text-slate-200 text-xl text-center font-bold`}
        >
          Create an account or
        </Text>
        <Text
          style={tw`text-slate-900 dark:text-slate-200 text-xl text-center font-bold`}
        >
          Sign in to your Hashnode Account
        </Text>
      </View>

      <View style={tw`w-full mb-24`}>
        <Text
          style={tw`text-slate-900 dark:text-slate-200 text-center mb-2 text-lg`}
        >
          Sign in with email address
        </Text>
        <TextInput
          style={tw`rounded-input`}
          textContentType="emailAddress"
          placeholderTextColor={"#64748b"}
          placeholder="Enter your email addres"
        />
        <TouchableOpacity
          activeOpacity={0.9}
          style={tw`w-60 rounded-full bg-blue-600 mx-auto py-3 px-4`}
        >
          <Text style={tw`text-lg font-bold text-white text-center`}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={tw`text-slate-900 dark:text-slate-300 text-center text-base font-semibold mb-2`}
        >
          or sign in with
        </Text>
        <View style={tw`flex-row gap-2 items-center`}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`primary-btn bg-black`}
          >
            <Icons.githubFill size={20} stroke="none" fill={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={async () => {
              try {
                const { createdSessionId, signIn, signUp, setActive } =
                  await startOAuthFlow();

                if (createdSessionId && setActive) {
                  setActive({ session: createdSessionId });
                } else {
                }
              } catch (err) {
                console.error("OAuth error", err);
              }
            }}
            style={tw`primary-btn bg-gray-100`}
          >
            <Icons.google size={20} stroke="none" fill={colors.slate["950"]} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`primary-btn bg-blue-500`}
          >
            <Icons.facebook size={20} stroke="none" fill={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`primary-btn bg-cyan-500`}
          >
            <Icons.linkedin size={20} stroke="none" fill={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
