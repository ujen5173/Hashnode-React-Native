import React from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";

const CardLoading = () => {
  return (
    <View style={tw`p-4`}>
      <View style={tw`flex-row mb-4 items-center gap-2`}>
        <View
          style={tw`w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800`}
        />

        <View style={tw`flex-1`}>
          <View
            style={tw`w-3/4 h-4 mb-2 rounded-full bg-slate-200 dark:bg-slate-800`}
          />
          <View
            style={tw`w-1/2 h-4 rounded-full bg-slate-200 dark:bg-slate-800`}
          />
        </View>
      </View>

      <View style={tw`mb-4`}>
        <View
          style={tw`w-11/12 mb-2 h-5 rounded-full bg-slate-200 dark:bg-slate-800`}
        />
        <View
          style={tw`w-8/12 mb-2 h-5 rounded-full bg-slate-200 dark:bg-slate-800`}
        />
      </View>

      <View
        style={tw`w-full h-48 mb-4 rounded-lg bg-slate-200 dark:bg-slate-800`}
      />

      <View style={tw`flex-row gap-2`}>
        <View
          style={tw`w-24 h-6 rounded-full bg-slate-200 dark:bg-slate-800`}
        />
        <View
          style={tw`w-24 h-6 rounded-full bg-slate-200 dark:bg-slate-800`}
        />
        <View
          style={tw`w-24 h-6 rounded-full bg-slate-200 dark:bg-slate-800`}
        />
      </View>
    </View>
  );
};

export default CardLoading;
